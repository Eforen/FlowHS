
class ContextMenu extends D3NE.ContextMenu {
  constructor(items, searchBar) {
    super(items, searchBar)
    //this.onClickOverride = onClickOverride
  }
  show(x, y, items, searchBar, onClick) {
    super.show(x, y, items, searchBar, this.onClickOverride || onClick)
  }
}

module.exports = ContextMenu
