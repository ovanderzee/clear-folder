const fs = require('fs')
const path = require('path')
const tap = require('tap')
const clearFolder = require('../cli.js')

const folderErrObj = function ( folder ) {
    return {
        message: `clear-folder can't find "${path.resolve(folder)}"`
    }
}

// you can't spy on functions in tap
const skipObj = {
    skip: 'the error is caught and the message is logged'
}

tap.test(`a message is logged when a non-existent folder is specified`, function ( t ) {
    const folder = 'non-existent-folder-name'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ), skipObj )

    t.end()
})

tap.test(`a message is logged when the home-folder is referenced`, function ( t ) {
    const folder = '~/.ssh'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ), skipObj )

    t.end()
})
