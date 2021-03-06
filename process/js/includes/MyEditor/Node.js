class Node extends D3NE.Node {
  constructor(title, logic) {
    super(title)
    this.logic = logic
  }

  procLogic() {
    if(window.NodeLogicProc == undefined) window.NodeLogicProc = 0
    window.NodeLogicProc++
    //if changed update logic down this branch to its output connections
    if(this.logic != null && this.logic(this))
      for (var o = 0; o < this.outputs.length; o++) {
        for (var c = 0; c < this.outputs[o].connections.length; c++) {
          this.outputs[o].connections[c].input.procLogic() //Is connected chain down logic update
        }
      }
    window.NodeLogicProc--
  }

  removeInput(input) {
    if (input.node !== this)
      throw new Error('Input is not on this node');
    for (var i = 0; i < this.inputs.length; i++) {
      if(this.inputs[i] == input){
        //Remove all connection
        for (var c = 0; c < input.connections.length; c++) {
          input.connections[c].remove()
        }
        //Remove Self
        this.inputs.splice(i, 1)

        return this
      }
    }
    throw new Error('Input already removed from this node');
  }

  removeOutput(output) {

    if (output.node !== this)
      throw new Error('Output is not on this node');
    for (var i = 0; i < this.outputs.length; i++) {
      if(this.outputs[i] == output){
        //Remove all connection
        for (var c = 0; c < output.connections.length; c++) {
          output.connections[c].remove()
        }
        //Remove Self
        this.outputs.splice(i, 1)

        return this
      }
    }
    throw new Error('Output already removed from this node');
  }
}



module.exports = Node
