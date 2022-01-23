import fs from 'fs'
import path from 'path'
import tap from 'tap'
import clearFolder from '../cli.js'

const folderErrObj = function ( folder ) {
    return {
        message: `clear-folder operates on subfolders of current directory; check ${folder}`
    }
}

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using '/'`, function ( t ) {
    const folder = '/'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ) )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using '.'`, function ( t ) {
    const folder = '.'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ) )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using './'`, function ( t ) {
    const folder = './'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ) )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the parent directory is targeted using '..'`, function ( t ) {
    const folder = '..'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ) )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when a sibling directory is targeted using '../*'`, function ( t ) {
    const folder = '../other-project'
    const throwing = function () { clearFolder( [folder] ) }
    t.throws( throwing, folderErrObj( folder ) )

    t.end()
})
