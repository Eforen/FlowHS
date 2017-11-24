var React = require('react');

module.exports = class RecentFilesListItem extends React.Component {
  render(){
		return(
      <li className="recentFiles-item media">
        <div className="recentFiles-head">
          <span className="name">{this.props.singleItem.name}</span>
          <span className="opened pull-right">{this.props.singleItem.date}</span>
        </div>
        <div className="filename">{this.props.singleItem.file}</div>
      </li>
		) //return
	}//render
}
