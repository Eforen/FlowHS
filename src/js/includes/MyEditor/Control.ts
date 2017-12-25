// @ts-ignore
import {Control as OldControl, Socket} from '../../NodeEditor';

export default class Control extends OldControl {
  constructor(html, handler, setValue) {
    super(html, handler)
    if(setValue) this.setValue = setValue
    else this.setValue = () => { }
  }
}

module.exports = Control
