import * as jQuery from 'jquery';
const $ = jQuery;
//import * as bootstrap from 'bootstrap';

//let editor = require('./editor')
//require('./editor')

import * as fs from 'fs';
// @ts-ignore
import * as FontAwesome from 'react-fontawesome'

import * as path from 'path';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import * as RecentFilesListItem from './includes/RecentFilesListItem';

// @ts-ignore
import Electron, { ipcRenderer as ipc, remote } from 'electron';
import RecentFileRecord from './includes/RecentFileRecord';
import MainInterface from './includes/MainInterface';
//const { dialog } = remote;

declare global {
    interface Window { openFile: (file: RecentFileRecord) => void; }
}

let baseDir = path.resolve(__dirname, '..');
let recentFilesLocation = path.resolve(__dirname, '..', 'data', 'recentFiles.json');
let loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation).toString());
console.log(loadRecent);


window.openFile = (file) => {
	//dialog.showMessageBox({ message: "The file "+(file.file.includes(baseDir)?"does":"does not")+" contain the base if it did it would look like: "+file.file.substring(baseDir.length), buttons: ["OK"] });
	if (file.file.includes(baseDir)) {
		file.file = file.file.substring(baseDir.length + 1);
	}
	//dialog.showMessageBox({ message: "Loading file "+file.file, buttons: ["OK"] });
	console.log("openFile: " + file.file)
	ipc.sendSync("openFile", file.file)
}

// @ts-ignore
let internalContext = null;

ipc.on("updateRecentFiles", (event: any) => {
	console.log("Refresh");
  event.returnValue = '';
	loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation).toString());
	console.log(loadRecent);
	ReactDOM.render(
		(<MainInterface recent={loadRecent}/>),
		document.getElementById("ApplicationWrapper")
	)
})

ReactDOM.render(
	(<MainInterface recent={loadRecent}/>),
	document.getElementById("ApplicationWrapper")
) //render

$(".header #Settings").tooltip()
$(".header #OpenFile").tooltip()
$(".header #NewFile").tooltip()
//Test Bootstrap
//$(function() {
//	$("#mainWindow").append('<h3 class="text-success">App Loaded</h3>');
//})
