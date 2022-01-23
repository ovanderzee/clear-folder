#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

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
    } else {
        throw new Error( `clear-folder can't find "${folder}"` )
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

    checkedFolders.forEach ( function ( checkedFolder ) {
        try {
            clearFolderContents( checkedFolder )
        } catch ( err ) {
            console.error( `${err.name}: ${err.message}` )
        }
    })
}

if (process.argv.length > 2) {
    clearFolderGate(
        // [0] = node, [1] = clear-folder
        process.argv.splice(2)
    )
}

export default clearFolderGate
