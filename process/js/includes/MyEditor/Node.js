class Node extends D3NE.Node {
  constructor(title, logic) {
    super(title)
    this.logic = logic
  }

  procLogic() {
    //if changed update logic down this branch to its output connections
    if(this.logic != null && this.logic(this))
      for (var o = 0; o < this.outputs.length; o++) {
        if(this.outputs[o].connections.length == 0) continue //Not connected move to next output

        this.outputs[o].connections[0].input.node.procLogic() //Is connected chain down logic update
      }
  }
}

module.exports = Node
