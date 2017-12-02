class Control extends D3NE.Control {
  constructor(html, handler, setValue) {
    super(html, handler)
    if(setValue) this.setValue = setValue
    else this.setValue = () => { }
  }
}

module.exports = Control
