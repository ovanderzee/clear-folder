import { spawnSync } from 'child_process'
import fs from 'fs'
import tap from 'tap'

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

tap.beforeEach(setup)

tap.test('test setup', function ( t ) {
    t.ok( fs.existsSync( process.cwd() + '/probe/probe.txt' ), `file ${probefile} should be set` )
    t.ok( fs.existsSync( process.cwd() + '/probe/playground/play.txt' ), `file ${playfile} should be set` )
    t.ok( fs.existsSync( process.cwd() + '/probe/playground/subfolder/sub.txt' ), `file ${subfile} should be set` )
    t.end()
})

tap.test('clear playground, folder remains, content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground'] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear playground with leading here-dot, is executed: content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', './probe/playground'] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear playground with trailing here-dot, is executed: content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground/.'] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear playground with leading up-dots, referencing sibling of current directory: nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js', '../probe/playground/subfolder'] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( playfile ), `file ${playfile} should not be touched` )
    t.end()
})

tap.test('clear playground with trailing up-dots, referencing "playground" directory: content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', 'probe/playground/subfolder/..'] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear playground with absolute path, referencing outside current directory: nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js', '/probe/playground/subfolder'] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( playfile ), `file ${playfile} should not be touched` )
    t.end()
})

tap.test('clear playground with full path, is executed: content gone', function ( t ) {
    spawnSync( 'node', ['cli.js', playground] )
    t.notOk( fs.existsSync( subfolder ), `folder ${subfolder} should not exist` )
    t.notOk( fs.existsSync( playfile ), `file ${playfile} should not exist` )
    t.end()
})

tap.test('clear module with full path, referencing the current directory: nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js', moduleRoot] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( playfile ), `file ${playfile} should not be touched` )
    t.end()
})

tap.test('clear without arguments: nothing happens', function ( t ) {
    spawnSync( 'node', ['cli.js'] )
    t.ok( fs.existsSync( subfolder ), `folder ${subfolder} should not be touched` )
    t.ok( fs.existsSync( subfile ), `file ${subfile} should not be touched` )
    t.end()
})
