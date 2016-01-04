// Module to control application life.
var app = require('app');

// Module to create native browser window.
var BrowserWindow = require('browser-window');

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1024, height: 800 });

  // Get userData path to save passwords.json
  var path = require('path');
  var fs = require('fs');

  var dataFilePath = path.join(app.getPath('userData'), 'passwords.json');
  mainWindow.dataFilePath = dataFilePath;
  console.log(dataFilePath);

  // Check if the file exists
  fs.access(dataFilePath, fs.F_OK, function(err) {
    if (err) {
        // File doesn't exist -> Create the file
        console.log('writing file');
        fs.writeFile(dataFilePath, '', function(err) {
          if(err) {
              return console.log(err);
          } else {
            console.log("Passwords.json file was created!");
          }
          
      });
    }
  }); // Ends - Get userData path to save passwords.json -

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});