// @ts-ignore
import {Output as OldOutput, Socket} from '../../NodeEditor';

export default class Output extends OldOutput {
  constructor(title: string, socket: Socket, defaultValue: any, syncer: any) {
    super(title, socket)

    this.value = defaultValue
    this.syncer = syncer
  }

  value: any;
  syncer: any;
  
  getValue() {
    return this.value
  }
  setValue(value: any) {
    this.syncer(this, value)
    this.value = value
  }
}

module.exports = Output
