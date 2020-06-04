[![Build Status](https://travis-ci.com/ovanderzee/clear-folder.svg?branch=master)](https://travis-ci.com/ovanderzee/clear-folder)

# clear-folder
Clears the contents of a directory synchronously,
for instance the build directory of your node package module.

## Safe deleting
Clear-folder is a cli app,
intended to use safely in the scripts section of a package.json.
It just uses the synchronous methods of the node.js fs module.
The directory to clear must be inside the current directory.
For brevity you may call this app with 'cf' instead of 'clear-folder'.

## Usage
Add a number of names of folders to empty:

```json
"scripts": {
    "...": "...",
    "prebuild": "cf folder1 folder2",
    "...": "..."
}
```

On the command line you could use:

```sh
npx cf folder
```

Nothing else!!
