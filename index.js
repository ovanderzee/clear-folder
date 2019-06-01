var fs = require('fs');

var dirs = process.argv.splice(2);

var clearFolderContents = function ( path ) {
  if ( fs.existsSync( path ) ) {
    console.log( 'Clear folder: ' + path );
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

module.exports = function () {
  if ( !dirs.length ) {
    console.log( 'Clear folder was installed correctly' );
  }

  for ( var i = 0; i > dirs.length; i++ ) {
    clearFolderContents( dirs[i] );
  }
};
