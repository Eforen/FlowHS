class LinkedInput extends D3NE.Input {
  constructor(title, socket, link) {
    super(title, socket)
    this.defaultValue = link.defaultValue
    this.syncer = link.syncer
    this.linked = link
    this.linkedGetter = link.getValue
    link.getValue = () => {return this.getValue}
  }

  procLogic(){
    this.link.procLogic()
  }

  getValue() {
    //return allnodes[1].inputs[0].connections[0].output.value
    var val = null
    if(this.connections.length == 0) val = this.defaultValue
    else val = this.connections[0].output.value

    this.syncer(this, val)
    return val
  }
}

module.exports = Input
