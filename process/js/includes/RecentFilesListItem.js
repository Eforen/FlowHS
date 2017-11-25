var React = require('react');

module.exports = class RecentFilesListItem extends React.Component {
  //var clicked = () => { this.props.clickCallback(this.props.singleItem.file) }
  render(){
		return(
      <a href="#" onClick={this.props.onClick}>
      <li className="recentFiles-item media">
        <div className="recentFiles-head">
          <span className="name">{this.props.singleItem.name}</span>
          <span className="opened pull-right">{this.props.singleItem.date}</span>
        </div>
        <div className="filename">{this.props.singleItem.file}</div>
      </li></a>
		) //return
	}//render
}
