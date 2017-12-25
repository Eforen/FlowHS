var $ = jQuery = require('jquery')
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')
var BoolBitHandeler = require('../BoolBitHandeler')

module.exports = new MyEditor.Component("NOT (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("In", Socket.Bit, false, BoolBitHandeler);
      var out = new MyEditor.Output("Out", Socket.Bit, true, BoolBitHandeler);

      var numControl = new MyEditor.Control(
         '<input class="bit" type="checkbox" onclick="return false;" checked>',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );
      //Set to true be cause starting out input defaults to false thus NOT false is the state without any connections
      window.allnodes[window.allnodes.length] = node
      return node
         .addInput(inp1)
         .addControl(numControl)
         .addOutput(out);
   },
   worker(node, inputs, outputs) {
   },
   logic(self) {
      var out = !self.inputs[0].getValue()
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].setValue(out)
      return true; //Was Changed so return true
   }
});
