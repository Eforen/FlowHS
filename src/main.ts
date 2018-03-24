import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

export default class Main {
    static mainWindow: Electron.BrowserWindow | undefined;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;
    static isDevMode: boolean;

    // Quit when all windows are closed.
    private static onWindowAllClosed() {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin')
            Main.application.quit();
    }

    
    // Called when the window is closed.
    private static onClose() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        Main.mainWindow = undefined;
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    private static onReady() {
        Main.createWindow()
    }
    private static async createWindow() {
        Main.mainWindow =
            new BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow
            .loadURL('file://' + __dirname + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);

        // Open the DevTools.
        if (Main.isDevMode) {
            await installExtension(REACT_DEVELOPER_TOOLS);
            Main.mainWindow.webContents.openDevTools();
        }
    }
    private static onActivate() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (Main.mainWindow == undefined) {
            Main.createWindow();
        }
    }
    static setup(
        app: Electron.App,
        browserWindow: typeof BrowserWindow,
        devMode: boolean) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies.  This
        // makes the code easier to write tests for

        Main.isDevMode = devMode;
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);
    }
}