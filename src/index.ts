import { app, BrowserWindow } from 'electron';
//import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import Main from './main'

const isDevMode: boolean = process.execPath.match(/[\\/]electron/) != null;

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

Main.setup(app, BrowserWindow, isDevMode);
