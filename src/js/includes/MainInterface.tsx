import * as React from "react";
import * as FontAwesome from 'react-fontawesome'
import RecentFileRecord from "./RecentFileRecord";
import { ipcRenderer as ipc, dialog } from "electron";

import * as path from 'path'

// Defines the interface of the properties of the TodoItem component
interface IMainInterfaceProps {
    recent: RecentFileRecord[];
  }
  
  // Defines the interface of the state of the TodoItem component
  interface IMainInterfaceState {
    recentFiles: RecentFileRecord[];
  }

export default class MainInterface extends React.Component<IMainInterfaceProps, IMainInterfaceState> {
	constructor(props) {
        super(props);
        
		this.state ={
			recentFiles: props.recent
		}
	}
	//getInitialState() {
		//return {
		//	recentFiles: this.props.recent
		//} //return
	//} //getInitialState
  render(){
		let recentFiles = (this.props as any).recent;

		let btnOpenSettings = () => undefined
		let btnOpenFile = () => {
			dialog.showOpenDialog({
				filters: [{ name: 'FlowHS Chip file', extensions: ['fhsc'] }],
				defaultPath: path.resolve(__dirname, '..', 'data', 'saves').toString()
			},
			 function (fileNames) {
				if (fileNames === undefined) return;
				let fileName = fileNames[0];
				//dialog.showMessageBox({ message: "The file is: "+fileName, buttons: ["OK"] });
				window.openFile(new RecentFileRecord(null,fileName, null))
				/*fs.readFile(fileName, 'utf-8', function (err, data) {
					document.getElementById("editor").value = data;
				});*/
			});
		}

		let newFile = () => {
			ipc.sendSync("newFile")
		}

		let closeWindow = () => {
			ipc.sendSync("closeWindow", "main")
		}

		let minWindow = () => {
			ipc.sendSync("minWindow", "main")
		}

		let myRecentFiles = recentFiles.map(function(item, index) {
			return (
				// @ts-ignore
				<RecentFilesListItem key = {index} singleItem = {item} onClick = {() => {openFile(item)}} />
			)
		}.bind(this)); //recentFiles.map

		return(
			<div className="application">
				<div className="titlebar">
					<span className="title">FlowHS (Hardware Simulator)</span>
					<a href="#" onClick={minWindow}><span id="min" className="button"><FontAwesome name='window-minimize' /></span></a>
					<a href="#" onClick={closeWindow}><span id="close" className="button"><FontAwesome name='times' /></span></a>
				</div>
				<div className="header">
				<a href="#" onClick={btnOpenSettings}><span id="Settings" className="h1" data-toggle="tooltip" data-placement="bottom" title="Settings"><FontAwesome name="cog"/></span></a>
				<a href="#" onClick={btnOpenFile}><span id="OpenFile" className="h1" data-toggle="tooltip" data-placement="bottom" title="Open Chip"><FontAwesome name="folder-open-o"/></span></a>
				<a href="#" onClick={newFile}><span id="NewFile" className="h1" data-toggle="tooltip" data-placement="bottom" title="New Chip"><FontAwesome name="plus"/></span></a>
				<span className="h1">Recent Files</span>
				</div>
				<div className="container">
					<div className="row">
		        <div className="recentFiles col-sm-12">
		          <ul className="item-list media-list">{myRecentFiles}</ul>
		        </div>
					</div>
				</div>
			</div>
		) //return
	}//render
}