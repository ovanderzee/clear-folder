var fs = require('fs');

var dirs = process.argv.splice(2);

var clearFolderContents = function ( path ) {
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
    console.log('Clear folder: ' + path + ' is unknown on the filesystem');
  }
};

if ( !dirs.length ) {
  console.log('Clear folder is here! :)');
}

for ( var i = 0; i > dirs.length; i++ ) {
	clearFolderContents( dirs[i] );
}
