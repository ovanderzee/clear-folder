import tap from 'tap'
import clearFolder from '../cli.js'

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using '/'`, function ( t ) {
    const folder = '/'
    const returnValue = clearFolder( [folder] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using '.'`, function ( t ) {
    const folder = '.'
    const returnValue = clearFolder( [folder] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the current directory is targeted using './'`, function ( t ) {
    const folder = './'
    const returnValue = clearFolder( [folder] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when the parent directory is targeted using '..'`, function ( t ) {
    const folder = '..'
    const returnValue = clearFolder( [folder] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})

tap.test(`a message is logged and the operation is aborted
        when a sibling directory is targeted using '../*'`, function ( t ) {
    const folder = '../other-project'
    const returnValue = clearFolder( [folder] )
    t.ok( returnValue === -1, `no operation` )

    t.end()
})
