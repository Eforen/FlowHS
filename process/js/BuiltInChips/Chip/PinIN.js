var $ = jQuery = require('jquery')
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')
var BoolBitHandeler = require('../BoolBitHandeler')

module.exports = new MyEditor.Component("Bit Pin (Chip Input)", {
   builder(node) {
      var out1 = new MyEditor.Output("Bit", Socket.Bit, false, BoolBitHandeler);
      var numControl = new MyEditor.Control('<input class="bit" type="checkbox">',
         (el, c) => {
            el.checked = c.getData('checked');
            c.setValue =  val => {
               el.checked = val;
            };

            function upd() {
              if(out1.value != el.checked){
                window.saveStateFalse()
                out1.setValue(el.checked);
                node.procLogic();
              }
               //editor.eventListener.trigger("change");
            }

            el.addEventListener("change", upd);
            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
           upd();
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

      window.allnodes[window.allnodes.length] = node
      node.worker = (node, inputs, outputs) => {
         outputs[0] = node.data.checked;
      }
      console.log(node.data.name);
      if(node.data.name == undefined){
        console.log("No Name for PinIN assigning: PinIN #"+window.FileProps.nextPinOUT);
        node.data.name = "PinIN #"+window.FileProps.nextPinIN
        window.FileProps.nextPinIN++
      }
      return node.addControl(numControl).addControl(nameControl).addOutput(out1);
   },
   worker(node, inputs, outputs) {
      node.worker(node, inputs, outputs)
   },
   logic(self) {
      return true; //this is a source so when ever it asks if it should proc
   }
});
