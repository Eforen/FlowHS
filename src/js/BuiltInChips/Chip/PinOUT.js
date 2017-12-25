var $ = jQuery = require('jquery')
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')
var BoolBitHandeler = require('../BoolBitHandeler')

module.exports = new MyEditor.Component("Bit Pin (Chip Output)", {
   builder(node) {
      var inp1 = new MyEditor.Input("In", Socket.Bit, false, BoolBitHandeler);
      //var out = new MyEditor.Output("Out", Socket.Null, true, BoolBitHandeler);

      var numControl = new MyEditor.Control(
         '<input class="bit" type="checkbox" onclick="return false;">',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );
      var nameControl = new MyEditor.Control('<input id="name" type="text">',
         (el, c) => {

            function upd() {
              if(node.data.name != el.value){
                window.saveStateFalse()
                node.data.name = el.value
              }
               //editor.eventListener.trigger("change");
            }

            el.addEventListener("change", upd);
            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
           upd();
         }
      );
      //Set to true be cause starting out input defaults to false thus NOT false is the state without any connections

      if(node.data.name == undefined){
        console.log("No Name for PinOUT assigning: PinOUT #"+window.FileProps.nextPinOUT);
        node.data.name = "PinOUT #"+window.FileProps.nextPinOUT
        window.FileProps.nextPinOUT++
      }
      window.allnodes[window.allnodes.length] = node
      return node
         .addInput(inp1)
         .addControl(numControl)
         .addControl(nameControl)
         //.addOutput(out);
   },
   worker(node, inputs, outputs) {
   },
   logic(self) {
      var out = self.inputs[0].getValue()
      self.controls[0].setValue(out)
      if(self.outputValue == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputValue = out
      return true; //Was Changed so return true
   }
});
