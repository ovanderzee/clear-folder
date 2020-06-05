const spawnSync = require('child_process').spawnSync;
const fs = require('fs')
const tap = require('tap')
const clearFolder = require('../cli.js')

tap.test(`a message is logged and the operation is aborted
        when no folders are specified`, function ( t ) {
    const throws = function () {clearFolder( [] )}
    const errObj = {
        message: 'clear-folder needs one or more foldernames to operate'
    }
    t.throws( throws, errObj )
    t.end()
})

tap.test(`a message is logged when a non-existent folder is specified`, function ( t ) {
    const path = 'non-existent-folder-name'
    const throws = function () {clearFolder( [path] )}
    const errObj = {
        message: `clear-folder can't find "${process.cwd() + '/' + path}"`
    }
    t.throws( throws, errObj, { skip: 'the error is caught and the message is logged' } )
    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when path operators are used`, function ( t ) {

    let folder = '.'
    let throws = function () {clearFolder( [folder] )}
    let errObj = {
        message: `clear-folder can't work with path operators in ${folder}`
    }
    t.throws( throws, errObj )

    folder = '..'
    throws = function () {clearFolder( [folder] )}
    errObj = {
        message: `clear-folder can't work with path operators in ${folder}`
    }
    t.throws( throws, errObj )

    folder = '~'
    throws = function () {clearFolder( [folder] )}
    errObj = {
        message: `clear-folder can't work with path operators in ${folder}`
    }
    t.throws( throws, errObj )

    t.end()
})
