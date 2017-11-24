var $ = jQuery = require('jquery')
var bootstrap = require('bootstrap')

//var editor = require('./editor')
//require('./editor')

var fs = eRequire('fs')
var FontAwesome = require('react-fontawesome')

let recentFilesLocation = eRequire('path').resolve(dirName, '..', 'data', 'recentFiles.json');
var loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation));
console.log(loadRecent);

var React = require('react')
var ReactDOM = require('react-dom')
var RecentFilesListItem = require('./includes/RecentFilesListItem')


class MainInterface extends React.Component {
	constructor() {
		super();
		this.state ={
			recentFiles: loadRecent
		}
	}
	getInitialState() {
		return {
			recentFiles: loadRecent
		} //return
	} //getInitialState
  render(){
		var recentFiles = this.state.recentFiles;

		var myRecentFiles = recentFiles.map(function(item, index) {
			return (
				<RecentFilesListItem key = {index} singleItem = {item}/>
			)
		}.bind(this)); //recentFiles.map

		return(
			<div className="application">
				<div className="titlebar"><span className="title">FlowHS (Hardware Simulator)</span><span id="min" className="button"><FontAwesome name='window-minimize' /></span><span id="close" className="button"><FontAwesome name='times' /></span></div>
				<div className="header">
				<span id="Settings" className="h1"><FontAwesome name="cog"/></span>
				<span id="NewFile" className="h1"><FontAwesome name="plus"/></span>
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

ReactDOM.render(
	<MainInterface />,
	document.getElementById("ApplicationWrapper")
) //render

//Test Bootstrap
//$(function() {
//	$("#mainWindow").append('<h3 class="text-success">App Loaded</h3>');
//})
