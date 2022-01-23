[![CircleCI](https://circleci.com/gh/ovanderzee/clear-folder/tree/main.svg?style=svg)](https://circleci.com/gh/ovanderzee/clear-folder/?branch=main)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/clear-folder/badge.svg?branch=main)](https://coveralls.io/github/ovanderzee/clear-folder?branch=main)

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

On the command line:

```sh
npx cf folder
```

In a script:

```js
const cf = require('clear-folder');
...
cf(['folder1', 'folder2'])
```

Nothing else!!
