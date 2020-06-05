#!/usr/bin/env node

const fs = require('fs')

// [0] = node, [1] = clear-folder
const folders = process.argv.splice(2)

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
        console.log( `clear-folder can't find "${path}"` )
    }
}

if ( !folders.length ) {
    console.log( `clear-folder needs folder-name(s) relative to the current directory to operate` )
}

folders.forEach ( function ( folder ) {
    const folderArray = folder.split('/')
    if (
        folderArray.includes('.') ||
        folderArray.includes('..') ||
        folderArray.includes('~')
    ) {
        console.log( `clear-folder can't work with the path oparators in "${folder}"` )
        return
    }
    clearFolderContents( process.cwd() + '/' + folder )
})
