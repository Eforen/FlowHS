import * as React from 'react';
import RecentFileRecord from './RecentFileRecord';


// Defines the interface of the properties of the TodoItem component
export interface IRecentFilesListItemProps {
  singleItem: RecentFileRecord;
  onClick: (event: any) => void;
}

// Defines the interface of the state of the TodoItem component
export interface IRecentFilesListItemState {
}

export default class RecentFilesListItem extends React.Component<IRecentFilesListItemProps, IRecentFilesListItemState> {
  
  constructor(props: IRecentFilesListItemProps) {
    super(props);
  }
  
  //var clicked = () => { this.props.clickCallback(this.props.singleItem.file) }
  render() {
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
