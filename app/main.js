const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const ipc = electron.ipcMain;
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let screenWindow
let editorWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    show: false,
    frame:false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //mainWindow = null

    //Die if main window is closed
    app.quit()
  })

  mainWindow.once('ready-to-show', function(){
    mainWindow.show();
  })

  ///////////////////
  // Screen Window //
  ///////////////////

  screenWindow = new BrowserWindow({
    width: 400, height:300,
    show: false
  })
  screenWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'screen.html'),
    protocol: 'file:',
    slashes: true
  }))

  screenWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    screenWindow = null
  })

  ///////////////////
  // Editor Window //
  ///////////////////

  editorWindow = new BrowserWindow({
    width: 800, height:600,
    show: false,
    frame:false
  })
  editorWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'editor.html'),
    protocol: 'file:',
    slashes: true
  }))

  editorWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    editorWindow = null
  })

  /*
  editorWindow.once('ready-to-show', function(){
    editorWindow.show();
  })
  */

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('openEditor', (event, args) => {
  event.returnValue = '';
  editorWindow.show();
})

ipc.on("openFile", (event, arg) => {
  event.returnValue = '';
  editorWindow.send("openFile", arg)
  editorWindow.show()
})

ipc.on("newFile", (event, arg) => {
  event.returnValue = '';
  editorWindow.send("openFile", "Default.fhsc")
  editorWindow.show()
})

ipc.on("updateRecentFiles", (event, arg) => {
  event.returnValue = '';
  mainWindow.send("updateRecentFiles")
})

ipc.on("closeWindow", (event, arg) => {
  event.returnValue = '';
  switch (arg) {
    case "main":
      app.quit()
      break
    case "editor":
      editorWindow.hide()
      break
    default:
      break
  }
})

ipc.on("minWindow", (event, arg) => {
  event.returnValue = '';
  switch (arg) {
    case "main":
      mainWindow.minimize()
      break
    case "editor":
      editorWindow.minimize()
      break
    default:
      break
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
