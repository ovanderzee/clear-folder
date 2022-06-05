#!/usr/bin/env node

import clearFolderGate from './lib/clear-folder.js'

if (process.argv && process.argv.length > 2) {
    clearFolderGate(
        // [0] = node, [1] = clear-folder
        process.argv.splice(2)
    )
}
