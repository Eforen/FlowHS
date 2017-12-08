// @ts-ignore
import {Output as OldOutput, Socket} from 'd3-node-editor';

export default class Input extends D3NE.Input {
  constructor(title, socket, defaultValue, syncer) {
    super(title, socket)
    this.defaultValue = defaultValue
    this.syncer = syncer
  }

  procLogic(){
    this.node.procLogic()
  }

  getValue() {
    //return allnodes[1].inputs[0].connections[0].output.value
    var val = null
    if(this.connections.length == 0) val = this.defaultValue
    else val = this.connections[0].output.getValue()

    this.syncer(this, val)
    return val
  }
}

module.exports = Input
