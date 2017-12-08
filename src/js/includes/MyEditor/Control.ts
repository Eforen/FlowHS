// @ts-ignore
import {Output as OldOutput, Socket} from 'd3-node-editor';

export default class Control extends D3NE.Control {
  constructor(html, handler, setValue) {
    super(html, handler)
    if(setValue) this.setValue = setValue
    else this.setValue = () => { }
  }
}

module.exports = Control
