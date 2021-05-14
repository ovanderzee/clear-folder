const fs = require('fs')
const path = require('path')
const tap = require('tap')
const clearFolder = require('../cli.js')

tap.test(`a message is logged and the operation is aborted
        when no folders are specified`, function ( t ) {
    const throwing = function () { clearFolder( [] ) }
    const errObj = {
        message: 'clear-folder needs one or more foldernames to operate'
    }
    t.throws( throwing, errObj )

    t.end()
})
