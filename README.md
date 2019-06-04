[![Build Status](https://travis-ci.com/ovanderzee/clear-folder.svg?branch=master)](https://travis-ci.com/ovanderzee/clear-folder)

# clear-folder
Clears the contents of a directory synchronously, your build directory for instance

## Bare bones
clear-folder is a cli app intended to use in the scripts section of a package.json. 
It just uses the synchronous methods of the node.js fs module.

Add a number of names of folders to empty:

    clear-folder folder
    clear-folder ./folder
    clear-folder folder1 folder2

On the command line you could use:

	npx clear-folder folder

Nothing else
