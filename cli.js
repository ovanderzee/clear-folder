#!/usr/bin/env node

const fs = require('fs')

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

const clearFolderGate = function ( folders ) {
    if ( !folders.length || ['--help', '-h', '-?'].includes(folders[0])) {
      throw new Error(`clear-folder needs one or more foldernames to operate`)
    }

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
        try {
            clearFolderContents( process.cwd() + '/' + folder )
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

module.exports = clearFolderGate
