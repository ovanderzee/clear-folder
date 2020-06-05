#!/usr/bin/env node

const fs = require('fs')

/**
 * Remove from deepest subfolder up to specified folder
 * @param {string} path - folder name
 */
const clearFolderContents = function ( path ) {
    if ( fs.existsSync( path ) ) {
        fs.readdirSync(path).forEach ( function ( file, index ) {
            const curPath = path + "/" + file
            if (fs.lstatSync( curPath ).isDirectory()) {
                clearFolderContents( curPath )
                fs.rmdirSync( curPath )
            } else {
                fs.unlinkSync( curPath )
            }
        })
    } else {
        throw new Error( `clear-folder can't find "${path}"` )
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

    // do not operate when finding opportunities to work
    // other than below the working directory
    folders.forEach ( function ( folder ) {
        const folderArray = folder.split('/')
        if (
            folderArray.includes( '.' ) ||
            folderArray.includes( '..' ) ||
            folderArray.includes( '~' )
        ) {
            throw new Error(
                `clear-folder can't work with path operators in ${folder}`
            )
        }
    })

    folders.forEach ( function ( folder ) {
        try {
            clearFolderContents( process.cwd() + '/' + folder )
        } catch ( err ) {
            // catch find-folder errors,
            // the command will be used fot hthe sake of being sure
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

module.exports = clearFolderGate
