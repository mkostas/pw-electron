// Module to control application life.
var app = require('app');

var path = require('path');
var fs = require('fs');
var initPath = path.join(app.getPath('userData'), 'position.json');
var dataFilePath = path.join(app.getPath('userData'), 'passwords.json');

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
  // If there is a file position.json get position and create mainWindow
  try {
      var data = JSON.parse(fs.readFileSync(initPath));
      mainWindow = new BrowserWindow({ width: data.width, height: data.height, x: data.x, y: data.y });
  // Else create a default mainWindow    
  } catch (err) {
      console.error(err);
      mainWindow = new BrowserWindow({ width: 1024, height: 800 });
  }

  // Get userData path to save passwords.json  
  mainWindow.dataFilePath = dataFilePath;

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

  // Emitted before the window is closed
  mainWindow.on('close', function () {       
      // Get window position and write it in userData/position.json    
      var windowPosition = mainWindow.getBounds();
      fs.writeFileSync(initPath, JSON.stringify(windowPosition));
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});