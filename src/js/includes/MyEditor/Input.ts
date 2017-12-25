// @ts-ignore
import { Socket, Input as OldInput} from '../../NodeEditor';

export default class Input extends OldInput {
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
