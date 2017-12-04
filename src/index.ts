// import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

import * as path from 'path';
import * as url from 'url';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
//if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//  app.quit();
//}


const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;
let screenWindow: BrowserWindow;
let editorWindow: BrowserWindow;

const createWindow = async () => {
  
  /////////////////
  // Main Window //
  /////////////////

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
  });

  // and load the index.html of the app.
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow = null;
    app.quit();
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  
  ///////////////////
  // Screen Window //
  ///////////////////

  screenWindow = new BrowserWindow({
    width: 400, height: 300,
    show: false,
  });
  
  screenWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'screen.html'),
    protocol: 'file:',
    slashes: true,
  }));

  screenWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    (screenWindow as any) = null;
  });

  ///////////////////
  // Editor Window //
  ///////////////////

  editorWindow = new BrowserWindow({
    width: 800, height: 600,
    show: false,
    frame: false,
  });

  editorWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'editor.html'),
    protocol: 'file:',
    slashes: true,
  }));

  editorWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    (editorWindow as any)  = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
