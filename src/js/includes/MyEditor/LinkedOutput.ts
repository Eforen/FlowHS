// @ts-ignore
import {Socket} from '../../NodeEditor';
import Output from './Output'

export default class LinkedOutput extends Output {
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
