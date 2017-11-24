(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

const MyEditor = require('./includes/MyEditor')

var modSocket = (socket)=>{
  socket.inputvalue = () => {

  }
}


var numSocket = new D3NE.Socket("number", "8 Bit Socket", "hint");
modSocket(numSocket)

var bitSocket = new D3NE.Socket("bit", "1 Bit Socket", "hint");
modSocket(bitSocket)

window.procNode = (node) => {
  if(node.inputs.length > 0){
    for (var n = 0; n < node.inputs.length; n++) {
      if(node.inputs[n].connections.length > 0) {
        //node.inputs[n].connections[0]
      }
    }
  }
}

window.allnodes = []
//Bit UserOutput
var componentBit = new MyEditor.Component("Bit (User Input)", {
   builder(node) {
      var out1 = new MyEditor.Output("Bit", bitSocket);
      var numControl = new D3NE.Control('<input type="checkbox">',
         (el, c) => {
            el.checked = c.getData('checked');

            function upd() {
              if(out1.value != el.checked){
                 out1.value = el.checked;
                 node.procLogic();
              }
               //editor.eventListener.trigger("change");
            }

            el.addEventListener("change", upd);
            //el.addEventListener("mousedown", function(e){e.stopPropagation()});// prevent node movement when selecting text in the input field
           upd();
         }
      );

      window.allnodes[window.allnodes.length] = node
      node.worker = (node, inputs, outputs) => {
         outputs[0] = node.data.checked;
      }
      return node.addControl(numControl).addOutput(out1);
   },
   worker(node, inputs, outputs) {
      node.worker(node, inputs, outputs)
   },
   logic(self) {
      return true; //this is a source so when ever it asks if it should proc
   }
});

//AND Gate
var componentAnd = new MyEditor.Component("AND", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", bitSocket, false);
      var inp2 = new MyEditor.Input("B", bitSocket, false);
      var out = new MyEditor.Output("Out", bitSocket);

      var numControl = new D3NE.Control(
         '<input readonly type="checkbox">',
         (el, control) => {
            control.setValue = val => {
               el.checked = val;
            };
         }
      );
      window.allnodes[window.allnodes.length] = node
      node.myworker = (node) => {
         var out = inputs[0][0] && inputs[1][0];
         editor.nodes.find(n => n.id == node.id).controls[0].setValue(out);
         outputs[0] = out;
      }
      return node
         .addInput(inp1)
         .addInput(inp2)
         .addControl(numControl)
         .addOutput(out);
   },
   worker(node, inputs, outputs) {
      node.worker(node, inputs, outputs)
   },
   logic(self) {
      var out = self.inputs[0].getValue() && self.inputs[1].getValue();
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});
//OR Gate
//NOT Gate
//NAND Gate
//NOR Gate
//XOR Gate
//XNOR Gate



/*

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

      node.worker = (node, inputs, outputs) => {
         var sum = inputs[0][0] + inputs[1][0];
         editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
         outputs[0] = sum;
      }
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
*/

var menu = new D3NE.ContextMenu({
  UserInput: {
    Bit:componentBit
  },
  Basic_Gates: {
    AND_Gate:componentAnd
  }/*,
  Values: {
    Value: componentNum,
    Action: function() {
      alert("ok");
      }
    },
    Add: componentAdd
    */
});

var container = document.getElementById("nodeEditor");
var components = [componentBit, componentAnd];
window.nodeComps = components
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
    //engine.process(editor.toJSON(),null); // imagine that it could take one second of time
});
/*
*/
editor.view.zoomAt(editor.nodes);
//editor.eventListener.trigger("change");
editor.view.resize();


},{"./includes/MyEditor":6}],2:[function(require,module,exports){
var Node = require('./Node')

class Component extends D3NE.Component {
  constructor(title, props) {
    super(title, props)
    this.logic = props.logic
  }

  newNode() {
    return new Node(this.name, this.logic);
  }
}

module.exports = Component


},{"./Node":4}],3:[function(require,module,exports){
class Input extends D3NE.Input {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.defaultValue = defaultValue
  }

  getValue() {
    //return allnodes[1].inputs[0].connections[0].output.value
    if(this.connections.length == 0) return this.defaultValue

    return this.connections[0].output.value
  }
}

module.exports = Input


},{}],4:[function(require,module,exports){
class Node extends D3NE.Node {
  constructor(title, logic) {
    super(title)
    this.logic = logic
  }

  procLogic() {
    //if changed update logic down this branch to its output connections
    if(this.logic != null && this.logic(this))
      for (var o = 0; o < this.outputs.length; o++) {
        if(this.outputs[o].connections.length == 0) continue //Not connected move to next output

        this.outputs[o].connections[0].input.node.procLogic() //Is connected chain down logic update
      }
  }
}

module.exports = Node


},{}],5:[function(require,module,exports){
class Output extends D3NE.Output {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.value = defaultValue
  }
}

module.exports = Output


},{}],6:[function(require,module,exports){
module.exports = {
  Input: require('./Input'),
  Output: require('./Output'),
  Component: require('./Component'),
  Node: require('./Node')
}


},{"./Component":2,"./Input":3,"./Node":4,"./Output":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxmYWtlXzI0ZjhlMDMxLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcQ29tcG9uZW50LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcSW5wdXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcaW5jbHVkZXNcXE15RWRpdG9yXFxOb2RlLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcT3V0cHV0LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUN0Qix1Q0FBdUM7QUFDdkMsMkNBQTJDOztBQUUzQyxrQ0FBa0M7QUFDbEMsMEJBQTBCO0FBQzFCLHdDQUF3Qzs7QUFFeEMsNERBQTREO0FBQzVELDZDQUE2QztBQUM3QyxnRkFBZ0Y7QUFDaEYsa0NBQWtDO0FBQ2xDLDZDQUE2QztBQUM3QyxpQ0FBaUM7QUFDakMsZ0RBQWdEOztBQUVoRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUM7O0FBRS9DLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxHQUFHO0FBQzFCLEVBQUUsTUFBTSxDQUFDLFVB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SUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO01BQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztNQUM5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQztNQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7TUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDZDtDQUNILENBQUMsQ0FBQztBQUNILFNBQVM7QUFDVCxVQUFVO0FBQ1YsV0FBVztBQUNYLFVBQVU7QUFDVixVQUFVO0FBQ1YsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7O0FBRUYsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0VBQzlCLFNBQVMsRUFBRTtJQUNULEdBQUcsQ0FBQyxZQUFZO0dBQ2pCO0VBQ0QsV0FBVyxFQUFFO0lBQ1gsUUFBUSxDQUFDLFlBQVk7QUFDekIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsQ0FBQyxDQUFD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QUcsSUFBSTs7OztBQ2pCckIsTUFBTSxNQUFNLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUMvQixXQUFXLDhCQUE4QjtJQUN2QyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVk7R0FDMUI7QUFDSCxDQUFDOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTTs7OztBQ1B2QixNQUFNLENBQUMsT0FBTyxHQUFHO0VBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUM7RUFDekIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUM7RUFDM0IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUM7RUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7Q0FDeEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc29sZS5sb2coXCJXVEYhIFlPXCIpXHJcbi8vdmFyIEQzTkUgPSByZXF1aXJlKFwiZDMtbm9kZS1lZGl0b3JcIik7XHJcbi8vdmFyIGFsaWdodCA9IHJlcXVpcmUoXCIuL2luY2x1ZGVzL2FsaWdodFwiKVxyXG5cclxuLy92YXIgYWxpZ2h0ID0gblJlcXVpcmUoXCJhbGlnaHRcIik7XHJcbi8vdmFyIGQzID0gblJlcXVpcmUoXCJkM1wiKTtcclxuLy92YXIgRDNORSA9IG5SZXF1aXJlKFwiZDMtbm9kZS1lZGl0b3JcIik7XHJcblxyXG4vL2ltcG9ydCAqIGFzIGFsaWdodCBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvYWxpZ2h0L2FsaWdodCdcclxuLy9pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvZDMnXHJcbi8vaW1wb3J0ICogYXMgRDNORSBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvZDMtbm9kZS1lZGl0b3IvYnVpbGQvZDMtbm9kZS1lZGl0b3InXHJcbi8vaW1wb3J0ICogYXMgYWxpZ2h0IGZyb20gJ2FsaWdodCdcclxuLy93aW5kb3cuYWxpZ2h0ID0gYWxpZ2h0ID0gcmVxdWlyZSgnYWxpZ2h0Jyk7XHJcbi8vd2luZG93LmQzID0gZDMgPSByZXF1aXJlKCdkMycpO1xyXG4vL3dpbmRvdy5EM05FID0gRDNORSA9IHJlcXVpcmUoJ2QzLW5vZGUtZWRpdG9yJylcclxuXHJcbmNvbnN0IE15RWRpdG9yID0gcmVxdWlyZSgnLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcblxyXG52YXIgbW9kU29ja2V0ID0gKHNvY2tldCk9PntcclxuICBzb2NrZXQuaW5wdXR2YWx1ZSA9ICgpID0+IHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5cclxudmFyIG51bVNvY2tldCA9IG5ldyBEM05FLlNvY2tldChcIm51bWJlclwiLCBcIjggQml0IFNvY2tldFwiLCBcImhpbnRcIik7XHJcbm1vZFNvY2tldChudW1Tb2NrZXQpXHJcblxyXG52YXIgYml0U29ja2V0ID0gbmV3IEQzTkUuU29ja2V0KFwiYml0XCIsIFwiMSBCaXQgU29ja2V0XCIsIFwiaGludFwiKTtcclxubW9kU29ja2V0KGJpdFNvY2tldClcclxuXHJcbndpbmRvdy5wcm9jTm9kZSA9IChub2RlKSA9PiB7XHJcbiAgaWYobm9kZS5pbnB1dHMubGVuZ3RoID4gMCl7XHJcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGUuaW5wdXRzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgIGlmKG5vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL25vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zWzBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5hbGxub2RlcyA9IFtdXHJcbi8vQml0IFVzZXJPdXRwdXRcclxudmFyIGNvbXBvbmVudEJpdCA9IG5ldyBNeUVkaXRvci5Db21wb25lbnQoXCJCaXQgKFVzZXIgSW5wdXQpXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBvdXQxID0gbmV3IE15RWRpdG9yLk91dHB1dChcIkJpdFwiLCBiaXRTb2NrZXQpO1xyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4nLFxyXG4gICAgICAgICAoZWwsIGMpID0+IHtcclxuICAgICAgICAgICAgZWwuY2hlY2tlZCA9IGMuZ2V0RGF0YSgnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkKCkge1xyXG4gICAgICAgICAgICAgIGlmKG91dDEudmFsdWUgIT0gZWwuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgb3V0MS52YWx1ZSA9IGVsLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgbm9kZS5wcm9jTG9naWMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIC8vZWRpdG9yLmV2ZW50TGlzdGVuZXIudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGQpO1xyXG4gICAgICAgICAgICAvL2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSl7ZS5zdG9wUHJvcGFnYXRpb24oKX0pOy8vIHByZXZlbnQgbm9kZSBtb3ZlbWVudCB3aGVuIHNlbGVjdGluZyB0ZXh0IGluIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgICAgIHVwZCgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIG5vZGUud29ya2VyID0gKG5vZGUsIGlucHV0cywgb3V0cHV0cykgPT4ge1xyXG4gICAgICAgICBvdXRwdXRzWzBdID0gbm9kZS5kYXRhLmNoZWNrZWQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGUuYWRkQ29udHJvbChudW1Db250cm9sKS5hZGRPdXRwdXQob3V0MSk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgbm9kZS53b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKVxyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHJldHVybiB0cnVlOyAvL3RoaXMgaXMgYSBzb3VyY2Ugc28gd2hlbiBldmVyIGl0IGFza3MgaWYgaXQgc2hvdWxkIHByb2NcclxuICAgfVxyXG59KTtcclxuXHJcbi8vQU5EIEdhdGVcclxudmFyIGNvbXBvbmVudEFuZCA9IG5ldyBNeUVkaXRvci5Db21wb25lbnQoXCJBTkRcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgTXlFZGl0b3IuSW5wdXQoXCJBXCIsIGJpdFNvY2tldCwgZmFsc2UpO1xyXG4gICAgICB2YXIgaW5wMiA9IG5ldyBNeUVkaXRvci5JbnB1dChcIkJcIiwgYml0U29ja2V0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIGJpdFNvY2tldCk7XHJcblxyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgcmVhZG9ubHkgdHlwZT1cImNoZWNrYm94XCI+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHdpbmRvdy5hbGxub2Rlc1t3aW5kb3cuYWxsbm9kZXMubGVuZ3RoXSA9IG5vZGVcclxuICAgICAgbm9kZS5teXdvcmtlciA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgIHZhciBvdXQgPSBpbnB1dHNbMF1bMF0gJiYgaW5wdXRzWzFdWzBdO1xyXG4gICAgICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KTtcclxuICAgICAgICAgb3V0cHV0c1swXSA9IG91dDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICBub2RlLndvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpXHJcbiAgIH0sXHJcbiAgIGxvZ2ljKHNlbGYpIHtcclxuICAgICAgdmFyIG91dCA9IHNlbGYuaW5wdXRzWzBdLmdldFZhbHVlKCkgJiYgc2VsZi5pbnB1dHNbMV0uZ2V0VmFsdWUoKTtcclxuICAgICAgc2VsZi5jb250cm9sc1swXS5zZXRWYWx1ZShvdXQpXHJcbiAgICAgIGlmKHNlbGYub3V0cHV0c1swXS52YWx1ZSA9PSBvdXQpIHJldHVybiBmYWxzZTsgLy9XYXMgdW5jaGFuZ2VkIHRlbGwgcHJvY1VwZGF0ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHVwZGF0ZVxyXG4gICAgICBzZWxmLm91dHB1dHNbMF0udmFsdWUgPSBvdXQ7XHJcbiAgICAgIHJldHVybiB0cnVlOyAvL1dhcyBDaGFuZ2VkIHNvIHJldHVybiB0cnVlXHJcbiAgIH1cclxufSk7XHJcbi8vT1IgR2F0ZVxyXG4vL05PVCBHYXRlXHJcbi8vTkFORCBHYXRlXHJcbi8vTk9SIEdhdGVcclxuLy9YT1IgR2F0ZVxyXG4vL1hOT1IgR2F0ZVxyXG5cclxuXHJcblxyXG4vKlxyXG5cclxudmFyIGNvbXBvbmVudE51bSA9IG5ldyBEM05FLkNvbXBvbmVudChcIk51bWJlclwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woJzxpbnB1dCB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnZhbHVlID0gYy5nZXREYXRhKCdudW0nKSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkKCkge1xyXG4gICAgICAgICAgICAgICBjLnB1dERhdGEoXCJudW1cIiwgcGFyc2VGbG9hdChlbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICBlZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkKTtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlLmFkZENvbnRyb2wobnVtQ29udHJvbCkuYWRkT3V0cHV0KG91dDEpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEubnVtO1xyXG4gICB9XHJcbn0pO1xyXG52YXIgY29tcG9uZW50QWRkID0gbmV3IEQzTkUuQ29tcG9uZW50KFwiQWRkXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IEQzTkUuSW5wdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuICAgICAgdmFyIGlucDIgPSBuZXcgRDNORS5JbnB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgb3V0ID0gbmV3IEQzTkUuT3V0cHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcblxyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgcmVhZG9ubHkgdHlwZT1cIm51bWJlclwiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIG5vZGUud29ya2VyID0gKG5vZGUsIGlucHV0cywgb3V0cHV0cykgPT4ge1xyXG4gICAgICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgfVxyXG59KTtcclxuKi9cclxuXHJcbnZhciBtZW51ID0gbmV3IEQzTkUuQ29udGV4dE1lbnUoe1xyXG4gIFVzZXJJbnB1dDoge1xyXG4gICAgQml0OmNvbXBvbmVudEJpdFxyXG4gIH0sXHJcbiAgQmFzaWNfR2F0ZXM6IHtcclxuICAgIEFORF9HYXRlOmNvbXBvbmVudEFuZFxyXG4gIH0vKixcclxuICBWYWx1ZXM6IHtcclxuICAgIFZhbHVlOiBjb21wb25lbnROdW0sXHJcbiAgICBBY3Rpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICBhbGVydChcIm9rXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgQWRkOiBjb21wb25lbnRBZGRcclxuICAgICovXHJcbn0pO1xyXG5cclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9kZUVkaXRvclwiKTtcclxudmFyIGNvbXBvbmVudHMgPSBbY29tcG9uZW50Qml0LCBjb21wb25lbnRBbmRdO1xyXG53aW5kb3cubm9kZUNvbXBzID0gY29tcG9uZW50c1xyXG52YXIgZWRpdG9yID0gbmV3IEQzTkUuTm9kZUVkaXRvcihcImRlbW9AMC4xLjBcIiwgY29udGFpbmVyLCBjb21wb25lbnRzLCBtZW51KTtcclxuLypcclxudmFyIG5uID0gY29tcG9uZW50TnVtLm5ld05vZGUoKTtcclxubm4uZGF0YS5udW0gPSAyO1xyXG52YXIgbjEgPSBjb21wb25lbnROdW0uYnVpbGRlcihubik7XHJcbnZhciBuMiA9IGNvbXBvbmVudE51bS5idWlsZGVyKGNvbXBvbmVudE51bS5uZXdOb2RlKCkpO1xyXG52YXIgYWRkID0gY29tcG9uZW50QWRkLmJ1aWxkZXIoY29tcG9uZW50QWRkLm5ld05vZGUoKSk7XHJcblxyXG5uMS5wb3NpdGlvbiA9IFs4MCwgMjAwXTtcclxubjIucG9zaXRpb24gPSBbODAsIDQwMF07XHJcbmFkZC5wb3NpdGlvbiA9IFs1MDAsIDI0MF07XHJcblxyXG5lZGl0b3IuY29ubmVjdChuMS5vdXRwdXRzWzBdLCBhZGQuaW5wdXRzWzBdKTtcclxuZWRpdG9yLmNvbm5lY3QobjIub3V0cHV0c1swXSwgYWRkLmlucHV0c1sxXSk7XHJcblxyXG5lZGl0b3IuYWRkTm9kZShuMSk7XHJcbmVkaXRvci5hZGROb2RlKG4yKTtcclxuZWRpdG9yLmFkZE5vZGUoYWRkKTtcclxuKi9cclxuLy8gIGVkaXRvci5zZWxlY3ROb2RlKHRub2RlKTtcclxuXHJcbnZhciBlbmdpbmUgPSBuZXcgRDNORS5FbmdpbmUoXCJkZW1vQDAuMS4wXCIsIGNvbXBvbmVudHMpO1xyXG5lZGl0b3IuZXZlbnRMaXN0ZW5lci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy9lbmdpbmUucHJvY2VzcyhlZGl0b3IudG9KU09OKCksbnVsbCk7IC8vIGltYWdpbmUgdGhhdCBpdCBjb3VsZCB0YWtlIG9uZSBzZWNvbmQgb2YgdGltZVxyXG59KTtcclxuLypcclxuKi9cclxuZWRpdG9yLnZpZXcuem9vbUF0KGVkaXRvci5ub2Rlcyk7XHJcbi8vZWRpdG9yLmV2ZW50TGlzdGVuZXIudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuZWRpdG9yLnZpZXcucmVzaXplKCk7XHJcbiIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9Ob2RlJylcclxuXHJcbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIEQzTkUuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgcHJvcHMpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBwcm9wcylcclxuICAgIHRoaXMubG9naWMgPSBwcm9wcy5sb2dpY1xyXG4gIH1cclxuXHJcbiAgbmV3Tm9kZSgpIHtcclxuICAgIHJldHVybiBuZXcgTm9kZSh0aGlzLm5hbWUsIHRoaXMubG9naWMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRcclxuIiwiY2xhc3MgSW5wdXQgZXh0ZW5kcyBEM05FLklucHV0IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgc29ja2V0LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBzb2NrZXQpXHJcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICAvL3JldHVybiBhbGxub2Rlc1sxXS5pbnB1dHNbMF0uY29ubmVjdGlvbnNbMF0ub3V0cHV0LnZhbHVlXHJcbiAgICBpZih0aGlzLmNvbm5lY3Rpb25zLmxlbmd0aCA9PSAwKSByZXR1cm4gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uc1swXS5vdXRwdXQudmFsdWVcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXRcclxuIiwiY2xhc3MgTm9kZSBleHRlbmRzIEQzTkUuTm9kZSB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGxvZ2ljKSB7XHJcbiAgICBzdXBlcih0aXRsZSlcclxuICAgIHRoaXMubG9naWMgPSBsb2dpY1xyXG4gIH1cclxuXHJcbiAgcHJvY0xvZ2ljKCkge1xyXG4gICAgLy9pZiBjaGFuZ2VkIHVwZGF0ZSBsb2dpYyBkb3duIHRoaXMgYnJhbmNoIHRvIGl0cyBvdXRwdXQgY29ubmVjdGlvbnNcclxuICAgIGlmKHRoaXMubG9naWMgIT0gbnVsbCAmJiB0aGlzLmxvZ2ljKHRoaXMpKVxyXG4gICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHRoaXMub3V0cHV0cy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgIGlmKHRoaXMub3V0cHV0c1tvXS5jb25uZWN0aW9ucy5sZW5ndGggPT0gMCkgY29udGludWUgLy9Ob3QgY29ubmVjdGVkIG1vdmUgdG8gbmV4dCBvdXRwdXRcclxuXHJcbiAgICAgICAgdGhpcy5vdXRwdXRzW29dLmNvbm5lY3Rpb25zWzBdLmlucHV0Lm5vZGUucHJvY0xvZ2ljKCkgLy9JcyBjb25uZWN0ZWQgY2hhaW4gZG93biBsb2dpYyB1cGRhdGVcclxuICAgICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOb2RlXHJcbiIsImNsYXNzIE91dHB1dCBleHRlbmRzIEQzTkUuT3V0cHV0IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgc29ja2V0LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBzb2NrZXQpXHJcbiAgICB0aGlzLnZhbHVlID0gZGVmYXVsdFZhbHVlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE91dHB1dFxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBJbnB1dDogcmVxdWlyZSgnLi9JbnB1dCcpLFxyXG4gIE91dHB1dDogcmVxdWlyZSgnLi9PdXRwdXQnKSxcclxuICBDb21wb25lbnQ6IHJlcXVpcmUoJy4vQ29tcG9uZW50JyksXHJcbiAgTm9kZTogcmVxdWlyZSgnLi9Ob2RlJylcclxufVxyXG4iXX0=
