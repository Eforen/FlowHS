const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("XNOR (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit, true);

      var numControl = new MyEditor.Control(
         '<input  class="bit" type="checkbox" onclick="return false;" checked>',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );
      window.allnodes[window.allnodes.length] = node
      return node
         .addInput(inp1)
         .addInput(inp2)
         .addControl(numControl)
         .addOutput(out);
   },
   worker(node, inputs, outputs) {
   },
   logic(self) {
      var out = self.inputs[0].getValue() == self.inputs[1].getValue();
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});
