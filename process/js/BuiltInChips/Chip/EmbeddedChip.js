var $ = jQuery = require('jquery')
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')
var BoolBitHandeler = require('../BoolBitHandeler')
var fs = eRequire('fs')

window.EmbedManager = {
  Embeded:{},
  code:{
    loadChip:{}
  },
  nextEmbedID: 0
}

module.exports = new MyEditor.Component("Embedded Chip", {
   builder(node) {
      node.EmbedID = window.EmbedManager.nextEmbedID
      window.EmbedManager.nextEmbedID++
      window.EmbedManager.code.loadChip["e"+node.EmbedID] = ()=>{

      }
      window.EmbedManager.Embeded["node"+node.EmbedID] = node
      var numControl = new MyEditor.Control(
         '<a id="EmbedChipLoadBtnNumber'+node.EmbedID+'" href="#" onClick="window.EmbedManager.Embeded[\'node'+node.EmbedID+'\'].procInternalLogic(); event.stopPropagation();"><div class="input-group"> <span class="input-group-addon" id="basic-addon1"><i class="fa fa-microchip" aria-hidden="true"></i></span>  <input type="text" class="form-control" placeholder="No Chip File" aria-label="filename" aria-describedby="basic-addon1" onfocus="document.getElementById(\'EmbedChipLoadBtnNumber'+node.EmbedID+'\').focus()"></div></a>',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );
      if(window.allnodes == undefined) window.allnodes = []
      window.allnodes.push(node)
      node.loaded=false
      node.chip={
        nodes : {},
        inputs: {},
        outputs: {}
      }
      node.data.inputs = node.data.inputs || {} //[node,input]
      node.loadChip = (tree) => {
        if(node.data.inputs == undefined) node.data.inputs=[]
        if(node.data.outputs == undefined) node.data.outputs=[]
        for (var n in tree.chip.nodes) {
          node.chip.nodes[n] = MyEditor.Node.fromJSON(tree.chip.nodes[n])
        }

        for (n in tree.chip.nodes) {
          for (var o = 0; o < tree.chip.nodes[n].outputs.length; o++) {
            for (var c = 0; c < tree.chip.nodes[n].outputs[o].connections.length; c++) {
              try {
                node.chip.nodes[n].outputs[o].connectTo(
                  node.chip.nodes[""+
                    tree.chip.nodes[n].outputs[o].connections[c].node
                  ].inputs[
                    tree.chip.nodes[n].outputs[o].connections[c].input
                  ])
              } catch (e) {

              } finally {

              }
            }
          }
          for (n in tree.chip.nodes) {
            for (var i = 0; i < tree.chip.nodes[n].inputs.length; i++) {
              for (var c = 0; c < tree.chip.nodes[n].inputs[i].connections.length; c++) {
                try {
                  node.chip.nodes[n].inputs[i].connectTo(
                    node.chip.nodes[""+
                      tree.chip.nodes[n].inputs[i].connections[c].node
                    ].outputs[
                      tree.chip.nodes[n].inputs[i].connections[c].output
                    ])
                } catch (e) {

                } finally {

                }
              }
            }
          }
        }

        for (var i = 0; i < node.data.inputs.length; i++) {
          if(node.chip.nodes[node.data.inputs[i][0]].title != "Bit Pin (Chip Input)"){
            node.data.inputs[i] = undefined
          }else{
            node.chip.inputs.push(node.chip.nodes[node.data.inputs[i][0]])
            node.addInput(new MyEditor.Input((node.chip.nodes[node.data.inputs[i][0]].data.name || "In"), Socket.Bit, false, BoolBitHandeler, node.chip.nodes[node.data.inputs[i][0]].outputs[node.data.inputs[i][1]]))
          }
        }

        testPinIns = allnodes.filter((n)=>{
          if (n.title != "Bit Pin (Chip Input)") return false
          if (node.chips.inputs.includes(n.id)) return false
          node.addInput(new MyEditor.Input((n.data.name || "In"), Socket.Bit, false, BoolBitHandeler, n.outputs[0]));
          node.chips.inputs.push()
          node.data.inputs.push([n.id,0])
          return true
        })


        node.data.outputs = node.data.outputs || {} //[node,input]
        for (var i = 0; i < node.data.outputs.length; i++) {
          if(node.chip.nodes[node.data.outputs[i][0]].title != "Bit Pin (Chip Input)"){
            node.data.outputs[i] = undefined
          }else{
            node.chip.outputs.push(node.chip.nodes[node.data.outputs[i][0]])
            node.addOutput(new MyEditor.Output((node.chip.nodes[node.data.outputs[i][0]].data.name || "Out"), Socket.Bit, false, BoolBitHandeler, node.chip.nodes[node.data.outputs[i][0]].inputs[node.data.outputs[i][1]]))
          }
        }

        testPinOuts = allnodes.filter((n)=>{
          if (n.title != "Bit Pin (Chip Output)") return false
          if (node.chips.outputs.includes(n.id)) return false
          node.addOutput(new MyEditor.Output((n.data.name || "Out"), Socket.Bit, false, BoolBitHandeler, n));
          node.chips.outputs.push()
          node.data.outputs[i]=[n.id,0]
          return true
        })

        node.loaded = true
      }
      node.procInternalLogic = () => {
        console.log("node.procInternalLogic");
        if(node.loaded){
          node.loaded = false
          for (var i = node.inputs.length - 1; i >= 0; i--) {
            node.removeInput(node.inputs[i])
          }
          for (var i = node.outputs.length - 1; i >= 0 ; i--) {
            node.removeOutput(node.outputs[i])
          }
        } else{
          var filenames = dialog.showOpenDialog({
    				filters: [{ name: 'FlowHS Chip file', extensions: ['fhsc'] }],
    				defaultPath: eRequire('path').resolve(dirName, '..', 'data', 'saves')
    			});
          if(filenames[0] == undefined){
              node.loaded = false
          } else{
              node.loadChip(JSON.parse(fs.readFileSync(filenames[0])))
          }
        }
      }

      return node
         .addControl(numControl);
   },
   worker(node, inputs, outputs) {
   },
   logic(self) {
      var out = self.inputs[0].getValue() && self.inputs[1].getValue();
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].setValue(out)
      return true; //Was Changed so return true
   }
});
