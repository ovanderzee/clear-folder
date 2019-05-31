[![Build Status](https://travis-ci.com/ovanderzee/clear-folder.svg?branch=master)](https://travis-ci.com/ovanderzee/clear-folder)

# clear-folder
Clears the contents of a directory synchronously, your build directory for instance

## Bare bones
clear-folder just uses of the synchronous methods of the node.js fs module.
Add a number of names of folders to empty:

    clear-folder folder
    clear-folder folder1 folder2

No options