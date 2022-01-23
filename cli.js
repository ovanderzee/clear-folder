#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Remove from deepest subfolder up to specified folder
 * @param {string} folder - folder name
 */
const clearFolderContents = function ( folder ) {
    if ( fs.existsSync( folder ) ) {
        fs.readdirSync(folder).forEach ( function ( file, index ) {
            const curPath = folder + "/" + file
            if (fs.lstatSync( curPath ).isDirectory()) {
                clearFolderContents( curPath )
                fs.rmdirSync( curPath )
            } else {
                fs.unlinkSync( curPath )
            }
        })
        return 1
    } else {
        console.error( `clear-folder can't find "${folder}"` )
        return 0
    }
}

/**
 * Check input sanity
 * @param {string[]} folder - folder names relative to working directory
 */
const clearFolderGate = function ( folders ) {
    // usage hint
    if ( !folders.length || ['--help', '-h', '-?'].includes(folders[0])) {
        throw new Error(`clear-folder needs one or more foldernames to operate`)
    }

    // do not operate on current directory or above
    const checkedFolders = folders.map ( function ( folder ) {
        const fullPath = path.resolve( folder )
        const projectPath = process.cwd() + '/'
        const localPath = fullPath.substr( projectPath.length )

        if (
            !fullPath.startsWith( process.cwd() ) ||
            fullPath === process.cwd()
        ) {
            throw new Error(
                `clear-folder operates on subfolders of current directory; check ${folder}`
            )
        }
        return fullPath
    })

    const removeTotal = checkedFolders.reduce((total, checkedFolder) => {
        const removeCount = clearFolderContents( checkedFolder )
        return total + removeCount
    }, 0)
    return removeTotal
}

if (process.argv && process.argv.length > 2) {
    return clearFolderGate(
        // [0] = node, [1] = clear-folder
        process.argv.splice(2)
    )
}

module.exports = clearFolderGate
