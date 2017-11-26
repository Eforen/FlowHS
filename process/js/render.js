var $ = jQuery = require('jquery')
var bootstrap = require('bootstrap')

//var editor = require('./editor')
//require('./editor')

var fs = eRequire('fs')
var FontAwesome = require('react-fontawesome')

let baseDir = eRequire('path').resolve(dirName, '..')
let recentFilesLocation = eRequire('path').resolve(dirName, '..', 'data', 'recentFiles.json');
var loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation));
console.log(loadRecent);

var React = require('react')
var ReactDOM = require('react-dom')
var RecentFilesListItem = require('./includes/RecentFilesListItem')

var ipc = eRequire('electron').ipcRenderer

var openFile = (file) => {
	//dialog.showMessageBox({ message: "The file "+(file.file.includes(baseDir)?"does":"does not")+" contain the base if it did it would look like: "+file.file.substring(baseDir.length), buttons: ["OK"] });
	if(file.file.includes(baseDir)) {
		file.file = file.file.substring(baseDir.length+1)
		file.local = true
	}
	//dialog.showMessageBox({ message: "Loading file "+file.file, buttons: ["OK"] });
	console.log("openFile: "+file.file)
	ipc.sendSync("openFile", file.file)
}
window.openFile = openFile

var internalContext = null;

class MainInterface extends React.Component {
	constructor(props) {
		super(props);
		internalContext = this
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
		var recentFiles = this.props.recent;

		var btnOpenSettings = () => {
		}
		var btnOpenFile = () => {
			dialog.showOpenDialog({
				filters: [{ name: 'FlowHS Chip file', extensions: ['fhsc'] }],
				defaultPath: eRequire('path').resolve(dirName, '..', 'data', 'saves')
			},
			 function (fileNames) {
				if (fileNames === undefined) return;
				var fileName = fileNames[0];
				//dialog.showMessageBox({ message: "The file is: "+fileName, buttons: ["OK"] });
				openFile({file:fileName})
				/*fs.readFile(fileName, 'utf-8', function (err, data) {
					document.getElementById("editor").value = data;
				});*/
			});
		}

		var newFile = () => {
			ipc.sendSync("newFile")
		}

		var closeWindow = () => {
			ipc.sendSync("closeWindow", "main")
		}

		var minWindow = () => {
			ipc.sendSync("minWindow", "main")
		}

		var myRecentFiles = recentFiles.map(function(item, index) {
			return (
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


ipc.on("updateRecentFiles", (event, arg) => {
	console.log("Refresh");
  event.returnValue = '';
	loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation));
	console.log(loadRecent);
	ReactDOM.render(
		<MainInterface recent={loadRecent}/>,
		document.getElementById("ApplicationWrapper")
	)
})

ReactDOM.render(
	<MainInterface recent={loadRecent}/>,
	document.getElementById("ApplicationWrapper")
) //render

$(".header #Settings").tooltip()
$(".header #OpenFile").tooltip()
$(".header #NewFile").tooltip()
//Test Bootstrap
//$(function() {
//	$("#mainWindow").append('<h3 class="text-success">App Loaded</h3>');
//})
