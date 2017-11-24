console.log("WTF! YO")
//var D3NE = require("d3-node-editor");
//var alight = require("./includes/alight")

//var alight = nRequire("alight");
//var d3 = nRequire("d3");
//var D3NE = nRequire("d3-node-editor");

//import * as alight from '../../node_modules/alight/alight'
//import * as d3 from '../../node_modules/d3'
//import * as D3NE from '../../node_modules/d3-node-editor/build/d3-node-editor'
//import * as alight from 'alight'
//window.alight = alight = require('alight');
//window.d3 = d3 = require('d3');
//window.D3NE = D3NE = require('d3-node-editor')

var numSocket = new D3NE.Socket("number", "8 Bit Socket", "hint");

var bitSocket = new D3NE.Socket("bit", "1 Bit Socket", "hint");

//Bit UserOutput
var componentBit = new D3NE.Component("Bit (User Input)", {
   builder(node) {
      var out1 = new D3NE.Output("Bit", bitSocket);
      var numControl = new D3NE.Control('<input type="checkbox">',
         (el, c) => {
            el.checked = c.getData('checked');

            function upd() {
               c.putData("checked", el.checked);
               editor.eventListener.trigger("change");
            }

            el.addEventListener("change", upd);
            //el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
           upd();
         }
      );

      return node.addControl(numControl).addOutput(out1);
   },
   worker(node, inputs, outputs) {
      outputs[0] = node.data.checked;
   }
});

//AND Gate
var componentAnd = new D3NE.Component("AND", {
   builder(node) {
      var inp1 = new D3NE.Input("A", bitSocket);
      var inp2 = new D3NE.Input("B", bitSocket);
      var out = new D3NE.Output("Out", bitSocket);

      var numControl = new D3NE.Control(
         '<input readonly type="checkbox">',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );

      return node
         .addInput(inp1)
         .addInput(inp2)
         .addControl(numControl)
         .addOutput(out);
   },
   worker(node, inputs, outputs) {
      var out = inputs[0][0] && inputs[1][0];
      editor.nodes.find(n => n.id == node.id).controls[0].setValue(out);
      outputs[0] = out;
   }
});
//OR Gate
//NOT Gate
//NAND Gate
//NOR Gate
//XOR Gate
//XNOR Gate



var componentNum = new D3NE.Component("Number", {
   builder(node) {
      var out1 = new D3NE.Output("Number", numSocket);
      var numControl = new D3NE.Control('<input type="number">',
         (el, c) => {
            el.value = c.getData('num') || 1;

            function upd() {
               c.putData("num", parseFloat(el.value));
               editor.eventListener.trigger("change");
            }

            el.addEventListener("input", upd);
            el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
           upd();
         }
      );

      return node.addControl(numControl).addOutput(out1);
   },
   worker(node, inputs, outputs) {
      outputs[0] = node.data.num;
   }
});

var componentAdd = new D3NE.Component("Add", {
   builder(node) {
      var inp1 = new D3NE.Input("Number", numSocket);
      var inp2 = new D3NE.Input("Number", numSocket);
      var out = new D3NE.Output("Number", numSocket);

      var numControl = new D3NE.Control(
         '<input readonly type="number">',
         (el, control) => {
            control.setValue = val => {
               el.value = val;
            };
         }
      );

      return node
         .addInput(inp1)
         .addInput(inp2)
         .addControl(numControl)
         .addOutput(out);
   },
   worker(node, inputs, outputs) {
      var sum = inputs[0][0] + inputs[1][0];
      editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
      outputs[0] = sum;
   }
});

var menu = new D3NE.ContextMenu({
  UserInput: {
    Bit:componentBit
  },
  Basic_Gates: {
    AND_Gate:componentAnd
  },
  Values: {
    Value: componentNum,
    Action: function() {
      alert("ok");
      }
    },
    Add: componentAdd
});

var container = document.getElementById("nodeEditor");
var components = [componentBit, componentAnd, componentNum, componentAdd];
var editor = new D3NE.NodeEditor("demo@0.1.0", container, components, menu);
/*
var nn = componentNum.newNode();
nn.data.num = 2;
var n1 = componentNum.builder(nn);
var n2 = componentNum.builder(componentNum.newNode());
var add = componentAdd.builder(componentAdd.newNode());

n1.position = [80, 200];
n2.position = [80, 400];
add.position = [500, 240];

editor.connect(n1.outputs[0], add.inputs[0]);
editor.connect(n2.outputs[0], add.inputs[1]);

editor.addNode(n1);
editor.addNode(n2);
editor.addNode(add);
*/
//  editor.selectNode(tnode);

var engine = new D3NE.Engine("demo@0.1.0", components);
editor.eventListener.on('change', () => {
    engine.process(1,null); // imagine that it could take one second of time
});
/*
*/
editor.view.zoomAt(editor.nodes);
editor.eventListener.trigger("change");
editor.view.resize();
