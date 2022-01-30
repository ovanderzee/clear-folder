import fs from 'fs'
import tap from 'tap'
import clearFolder from '../cli.js'


tap.test(`one removal was carried out when an existent folder is specified`, function ( t ) {
    const folder = 'my-folder-name'
    if ( !fs.existsSync( folder ) ) {
        fs.mkdirSync( folder )
    }
    const removeCount = clearFolder( [folder] )
    t.ok( removeCount === 1, `one removal was carried out` )

    if ( fs.existsSync( folder ) ) {
        fs.rmdirSync( folder )
    } else {
        t.ok( true, `one folder already gone` )
    }
    t.end()
})

tap.test(`no removals were carried out when a non-existent folder is specified`, function ( t ) {
    const folder = 'non-existent-folder-name'
    const removeCount = clearFolder( [folder] )
    t.ok( removeCount === 0, `no removals were carried out` )

    t.end()
})

tap.test(`no removals were carried out when the home-folder is referenced`, function ( t ) {
    const folder = '~/.ssh'
    const removeCount = clearFolder( [folder] )
    t.ok( removeCount === 0, `no removals were carried out` )

    t.end()
})
