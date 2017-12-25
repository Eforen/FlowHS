// @ts-ignore
import {Component as OldComponent, Socket} from '../../NodeEditor';

export default class Component extends OldComponent {
  constructor(title, props) {
    super(title, props)
    this.logic = props.logic
  }

  newNode() {
    return new Node(this.name, this.logic);
  }
}

module.exports = Component
