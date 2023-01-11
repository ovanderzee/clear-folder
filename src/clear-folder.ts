import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

/** Emphesised log */
const logInfo = function ( text: string ): void {
    console.info( chalk.bold( ` ${text} ` ) )
}

/** Distinguishing log */
const logWarning = function ( text: string ): void {
    console.error(chalk.bgCyan.black(` ${text} `))
}

/** Distinguishing abortion message */
const logError = function ( text: string ): void {
    console.error( chalk.bgRed.whiteBright( ` ${text} ` ) )
}

/**
 * Remove files and subfolders in the specified folder
 * @param {string} folder - folder name
 * @return {number} folder removed
 */
const clearFolderContents = function ( folder: string ): number {
    if ( fs.existsSync( folder ) ) {
        fs.readdirSync(folder).forEach ( function ( file, index ) {
            const curPath = folder + "/" + file
            if (fs.lstatSync( curPath ).isDirectory()) {
                fs.rmSync( curPath, { recursive: true, force: true } )
            } else {
                fs.unlinkSync( curPath )
            }
        })
        return 1
    } else {
        const text = `clear-folder can't find "${folder.substr( process.cwd().length + 1 )}"`
        logWarning( text )
        return 0
    }
}

/**
 * Check input sanity
 * @param {string[]} folder - folder names relative to working directory
 * @return {number} folders removed
 */
const clearFolderGate = function ( folders: string[] ): number {
    // usage hint
    if ( !folders.length || ['--help', '-h'].includes( folders[0] ) || folders[0].includes( '?' ) ) {
        const text = `clear-folder needs one or more foldernames to operate`
        logInfo( text )
        return -1
    }

    // filter out attempts to operate outside the current working directory
    const checkedFolders = folders
        .map ( folder => {
            const fullPath = path.resolve( folder )

            if (
                !fullPath.startsWith( process.cwd() ) ||
                fullPath === process.cwd()
            ) {
                const text = `clear-folder operates on subfolders of current directory; check "${folder}"`
                logError( text )
                return ''
            }
            return fullPath
        })
        .filter ( folder => folder )

    if (folders.length === checkedFolders.length) {
        const removeTotal = checkedFolders.reduce((total, checkedFolder) => {
            const removeCount = clearFolderContents( checkedFolder )
            return total + removeCount
        }, 0)
        return removeTotal
    } else {
        // do not operate on current directory or outside
        return -1
    }
}

export default clearFolderGate
