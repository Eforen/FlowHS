// @ts-ignore
import {Output as OldOutput, Socket} from 'd3-node-editor';

export default class ContextMenu extends D3NE.ContextMenu {
  constructor(items, searchBar) {
    super(items, searchBar)
    //this.onClickOverride = onClickOverride
  }
  show(x, y, items, searchBar, onClick) {
    super.show(x, y, items, searchBar, this.onClickOverride || onClick)
  }
}

module.exports = ContextMenu
