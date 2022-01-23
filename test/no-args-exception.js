const fs = require('fs')
const path = require('path')
const tap = require('tap')
const clearFolder = require('../cli.js')

tap.test(`the operation is aborted
        when no folders are specified`, function ( t ) {
    const returnValue = clearFolder( [] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`the operation is aborted
        when help was wanted (1)`, function ( t ) {
    const returnValue = clearFolder( ['--help'] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`the operation is aborted
        when help was wanted (2)`, function ( t ) {
    const returnValue = clearFolder( ['?'] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})
