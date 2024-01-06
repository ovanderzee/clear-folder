import fs from 'fs'
import tap from 'tap'
import clearFolder from '../lib/clear-folder.js'

const setupTest = ( t, folders ) => {
    folders.forEach(folder => {
        if ( !fs.existsSync( folder ) ) {
            fs.mkdirSync( folder )
        } else {
            t.notOk( true, `in "${t.name}", folder "${folder}" was already there` )
        }
    })
}

const teardownTest = ( t, folders ) => {
    folders.forEach( folder => {
        if ( fs.existsSync( folder ) ) {
            fs.rmdirSync( folder )
        } else {
            t.ok( true, `in "${t.name}", folder "${folder}" was already gone` )
        }
    })
}


tap.test(`multiple removals are carried out when existing folders are specified`, function ( t ) {
    const folders = ['my-folder-name', 'your-folder-name', 'their-folder-name']
    setupTest( t, folders )

    const removeCount = folders.reduce( ( total, folder ) => {
        return total + clearFolder( [folder] )
    }, 0 )
    t.ok( removeCount === folders.length, `multiple removals are carried out` )

    teardownTest ( t, folders )
    t.end()
})

tap.test(`multiple removals are carried out when a non-existent folder among existing folders are specified`, function ( t ) {
    const folders = ['my-folder-name', 'your-folder-name', 'their-folder-name']
    setupTest( t, folders )
    // add fake folder in the middle
    folders.splice(1, 0, 'non-existent-folder-name')

    const removeCount = folders.reduce( ( total, folder ) => {
        return total + clearFolder( [folder] )
    }, 0 )
    t.ok( removeCount === folders.length - 1, `multiple but one removals are carried out` )

    teardownTest ( t, folders )
    t.end()
})

tap.test(`no removals are carried out when non-existent folders are specified`, function ( t ) {
    const folder = 'non-existent-folder-name'
    const removeCount = clearFolder( [folder] )
    t.ok( removeCount === 0, `no removals are carried out` )

    t.end()
})

tap.test(`no removals are carried out when the home-folder is referenced`, function ( t ) {
    const folder = '~/.ssh'
    const removeCount = clearFolder( [folder] )
    t.ok( removeCount === 0, `no removals are carried out` )

    t.end()
})

tap.test(`the operation is aborted when an existent folder outside the current working directory is specified`, function ( t ) {
    const folder = 'target-folder'
    fs.mkdirSync( folder )
    process.chdir( 'test' )

    const removeCount = clearFolder( ['../' + folder] )
    t.ok( removeCount === -1, `the operation is aborted` )

    process.chdir( '..' )
    fs.rmdirSync( folder )
    t.end()
})
