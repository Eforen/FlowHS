'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import * as fs from 'fs'
import ApplicationType from './ApplicationType'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null
let simulatorWindow: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, frame:false, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  
  //////////////////////
  // Simulator Window //
  //////////////////////
  
  
  // Create the browser window.
  simulatorWindow = new BrowserWindow({ width: 400, height: 200, frame:false, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    simulatorWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) simulatorWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    simulatorWindow.loadURL('app://./index.html')
  }

  simulatorWindow.on('closed', () => {
    simulatorWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.on('whatAmI', (event, arg) => {
  // event.returnValue = '';
  if (mainWindow && event.sender == mainWindow.webContents) event.returnValue = ApplicationType.Editor
  if (simulatorWindow && event.sender == simulatorWindow.webContents) event.returnValue = ApplicationType.Simulator
  else event.returnValue = ApplicationType.TBD
})

ipcMain.on("closeWindow", (event, arg) => {
  event.returnValue = '';
  switch (arg) {
    case ApplicationType.Editor:
      app.quit()
      break
    case ApplicationType.Simulator:
      if(simulatorWindow != null) simulatorWindow.hide()
      break
    default:
      if (mainWindow && event.sender == mainWindow.webContents) app.quit()
      if (simulatorWindow && event.sender == simulatorWindow.webContents) simulatorWindow.hide()
      else console.log('Not sure what I am supposed to close... Did you make a new window?')
      break
  }
})

ipcMain.on("minWindow", (event, arg) => {
  event.returnValue = '';
  switch (arg) {
    case ApplicationType.Editor:
      if(mainWindow != null) mainWindow.minimize()
      break
    case ApplicationType.Simulator:
      if(simulatorWindow != null) simulatorWindow.minimize()
      break
    default:
      if (mainWindow && event.sender == mainWindow.webContents) mainWindow.minimize()
      if (simulatorWindow && event.sender == simulatorWindow.webContents) simulatorWindow.minimize()
      else console.log('Not sure what I am supposed to minimize... Did you make a new window?')
      break
  }
})

ipcMain.on("saveFlowFile_getPath", (event, args) => {
  event.returnValue = '';
  let options = {
    //Placeholder 1
    title: "FlowHS: Save Chip",
    
    //Placeholder 2
    defaultPath : args[0],//"C:\\BrainBell.png",
    
    //Placeholder 4
    buttonLabel : "Save Electron File",
    
    //Placeholder 3
    filters :[
     {name: 'FlowHS Chip File', extensions: ['chip']},
     {name: 'All Files', extensions: ['*']}
    ]
   }
   
   //Synchronous
   let filename = dialog.showSaveDialog(options)
   console.log(filename)
   event.returnValue = filename
   
   //Or asynchronous - using callback
  //  dialog.showSaveDialog(WIN, options, (filename) => {
  //   console.log(filename)
  //  })

  //  dialog.showSaveDialog(mainWindow, options, args => {

  //  })
})

ipcMain.on("SaveTrigger", async (event, path, data) => {
  event.returnValue='false'
  try {
    let backedupFile = false;
    if(fs.existsSync(path)) {
      const existingFile = await fs.promises.stat(path)
      if(existingFile.isFile()) await fs.promises.rename(path, `${path}.bak`)
      if(existingFile.isDirectory()) {
        dialog.showErrorBox('Error Saving', `Folder found at target path: \`${path}\``)
        //event.reply()
        return
      }
      backedupFile = true;
    }
    await fs.promises.writeFile(path, data)
    event.returnValue='true'
    if(backedupFile) await fs.promises.unlink(`${path}.bak`)
  } catch (error){
    dialog.showErrorBox('Error Saving', 'Your file may have been renamed with a .bak on the end of it if this is the case you will need to fix this before it will work to save this file.')
    throw error
  }
  console.log('done')
  //event.reply()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
