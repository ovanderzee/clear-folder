#!/usr/bin/env node

const fs = require('fs');

// [0] = node, [1] = clear-folder
const folders = process.argv.splice(2);

const clearFolderContents = function ( path ) {
  if ( fs.existsSync( path ) ) {
    fs.readdirSync(path).forEach ( function ( file, index ) {
      var curPath = path + "/" + file;
      if (fs.lstatSync( curPath ).isDirectory()) {
        clearFolderContents( curPath );
        fs.rmdirSync( curPath );
      } else {
        fs.unlinkSync( curPath );
      }
    });
  } else {
    console.log( 'Clear folder: ' + path + ' is unknown on the filesystem' );
  }
};

if ( !folders.length ) {
  console.log( 'Clear folder was installed correctly' );
}

folders.forEach ( function ( folder ) {
  clearFolderContents( folder );
});
