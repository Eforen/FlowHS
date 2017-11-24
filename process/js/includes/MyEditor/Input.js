class Input extends D3NE.Input {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.defaultValue = defaultValue
  }

  getValue() {
    //return allnodes[1].inputs[0].connections[0].output.value
    if(this.connections.length == 0) return this.defaultValue

    return this.connections[0].output.value
  }
}

module.exports = Input
