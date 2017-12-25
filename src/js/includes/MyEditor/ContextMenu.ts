// @ts-ignore
import {ContextMenu as OldContextMenu, Socket} from '../../NodeEditor';

export default class ContextMenu extends OldContextMenu {
  constructor(items, searchBar) {
    super(items, searchBar)
    //this.onClickOverride = onClickOverride
  }
  show(x, y, items, searchBar, onClick) {
    super.show(x, y, items, searchBar, this.onClickOverride || onClick)
  }
}

module.exports = ContextMenu
