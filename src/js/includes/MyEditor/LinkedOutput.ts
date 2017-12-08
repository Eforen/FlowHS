// @ts-ignore
import {Output as OldOutput, Socket} from 'd3-node-editor';

export default class LinkedOutput extends D3NE.Output {
  constructor(title, socket, link) {
    super(title, socket)
    this.value = link.value
    this.syncer = link.syncer
    this.linked = link
    this.linkedGetter = link.getValue
  }

  getValue(){
    this.linked.getValue()
  }

  setValue(value){
    this.value
  }
}

module.exports = Output
