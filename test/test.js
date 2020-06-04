const spawnSync = require('child_process').spawnSync;
const fs = require('fs')
const tap = require('tap')

const moduleRoot = process.cwd()
const probefolder = moduleRoot + '/probe'
const probefile = probefolder + '/probe.txt'
const playground = probefolder + '/playground'
const playfile = playground + '/play.txt'
const subfolder = playground + '/subfolder'
const subfile = subfolder + '/sub.txt'

const setup = function () {
    const check = function ( folder, file ) {
        if ( !fs.existsSync( folder ) ) {
            fs.mkdirSync( folder )
        }
        if ( !fs.existsSync( file ) ) {
            fs.writeFileSync( file, '' )
        }
    }
    check( probefolder, probefile )
    check( playground, playfile )
    check( subfolder, subfile )
}

tap.beforeEach((done, t) => {
    setup()
    done()
})

tap.test('test setup', function ( t ) {
    t.ok( fs.existsSync( process.cwd() + '/probe/probe.txt' ), `file ${probefile} should be set` )
    t.ok( fs.existsSync( process.cwd() + '/probe/playground/play.txt' ), `file ${playfile} should be set` )
    t.ok( fs.existsSync( process.cwd() + '/probe/playground/subfolder/sub.txt' ), `file ${subfile} should be set` )
    t.end()
})

tap.test('clear playground, folder remains', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground'] )
    t.ok( fs.existsSync( playground ), `folder ${playground} should exist` )
    t.end()
})

tap.test('clear playground, content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground'] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear playground with dot, nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground/.'] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( playfile ), `file ${playfile} should not be touched` )
    t.end()
})

tap.test('clear playground with up-dots, nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground/subfolder/..'] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( playfile ), `file ${playfile} should not be touched` )
    t.end()
})
