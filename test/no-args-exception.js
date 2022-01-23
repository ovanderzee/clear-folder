import fs from 'fs'
import path from 'path'
import tap from 'tap'
import clearFolder from '../cli.js'

tap.test(`a message is logged and the operation is aborted
        when no folders are specified`, function ( t ) {
    const throwing = function () { clearFolder( [] ) }
    const errObj = {
        message: 'clear-folder needs one or more foldernames to operate'
    }
    t.throws( throwing, errObj )

    t.end()
})
