(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("Bit (User Input)", {
   builder(node) {
      var out1 = new MyEditor.Output("Bit", Socket.Bit);
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


},{"../../includes/MyEditor":12,"../Sockets":5}],2:[function(require,module,exports){
var ex = {
  Bit: require('./Bit'),
  all: []
}

ex.all.push(ex.Bit)

module.exports = ex


},{"./Bit":1}],3:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("AND", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit);

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


},{"../../includes/MyEditor":12,"../Sockets":5}],4:[function(require,module,exports){
var ex = {
  AND: require('./AND'),
  //OR Gate
  //OR: require('./OR'),
  //NOT Gate
  //NOT: require('./NOT'),
  //NAND Gate
  //NAND: require('./NAND'),
  //NOR Gate
  //NOR: require('./NOR'),
  //XOR Gate
  //XOR: require('./XOR'),
  //XNOR Gate
  //XNOR: require('./XNOR')
  all: []
}

ex.all.push(ex.AND)
//ex.all.push(ex.OR)
//ex.all.push(ex.NOT)
//ex.all.push(ex.NAND)
//ex.all.push(ex.NOR)
//ex.all.push(ex.XOR)
//ex.all.push(ex.XNOR)
module.exports = ex


},{"./AND":3}],5:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')

module.exports = {
  Bus: new D3NE.Socket("bus", "n Bit Bus Socket", "hint"),
  Bit: new D3NE.Socket("bit", "1 Bit Socket", "hint")
}


},{"../../includes/MyEditor":12}],6:[function(require,module,exports){
var ex = {
  Input: require('./Input'),
  Logic: require('./Logic'),
  Socket: require('./Sockets'),
  AllComponents: []
}

var addComps = (comps) => {
  for (var i = 0; i < comps.all.length; i++) {
    ex.AllComponents.push(comps.all[i])
  }
}

addComps(ex.Input)
addComps(ex.Logic)

module.exports = ex


},{"./Input":2,"./Logic":4,"./Sockets":5}],7:[function(require,module,exports){
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
const BuildIn = require('./BuiltInChips')
window.BuildIn = BuildIn

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

//AND Gate
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
    Bit:BuildIn.Input.Bit
  },
  Basic_Gates: {
    AND_Gate:BuildIn.Logic.AND
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
//var components = [BuildIn.Input.Bit, BuildIn.Logic.AND];
var components = BuildIn.AllComponents
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


},{"./BuiltInChips":6,"./includes/MyEditor":12}],8:[function(require,module,exports){
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


},{"./Node":10}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
class Output extends D3NE.Output {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.value = defaultValue
  }
}

module.exports = Output


},{}],12:[function(require,module,exports){
module.exports = {
  Input: require('./Input'),
  Output: require('./Output'),
  Component: require('./Component'),
  Node: require('./Node')
}


},{"./Component":8,"./Input":9,"./Node":10,"./Output":11}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXElucHV0XFxCaXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxJbnB1dFxcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxMb2dpY1xcQU5ELmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcTG9naWNcXGluZGV4LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcU29ja2V0c1xcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxpbmRleC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxmYWtlXzUzNWE5NjIwLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcQ29tcG9uZW50LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcSW5wdXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcaW5jbHVkZXNcXE15RWRpdG9yXFxOb2RlLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcT3V0cHV0LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7QUFDbkQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQzs7QUFFbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUU7R0FDekQsT0FBTyxPQUFPO01BQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QjtTQUN4RCxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUs7QUFDcEIsWUFBWSxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBRWxDLFNBQVMsR0FBRyxHQUFHO2NBQ2IsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLGVBQWU7O0FBRWYsYUFBYTs7QUFFYixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7O1dBRXBDLEdBQUcsRUFBRSxDQUFDO1VBQ1A7QUFDVixPQUFPLENBQUM7O01BRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FB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TSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWTtHQUMxQjtBQUNILENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOzs7O0FDUHZCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7RUFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQztFQUN6QixNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQztFQUMzQixTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztFQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUN4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiQml0IChVc2VyIElucHV0KVwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBNeUVkaXRvci5PdXRwdXQoXCJCaXRcIiwgU29ja2V0LkJpdCk7XHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbCgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicsXHJcbiAgICAgICAgIChlbCwgYykgPT4ge1xyXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gYy5nZXREYXRhKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGQoKSB7XHJcbiAgICAgICAgICAgICAgaWYob3V0MS52YWx1ZSAhPSBlbC5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICBvdXQxLnZhbHVlID0gZWwuY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICBub2RlLnByb2NMb2dpYygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgLy9lZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZCk7XHJcbiAgICAgICAgICAgIC8vZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hbGxub2Rlc1t3aW5kb3cuYWxsbm9kZXMubGVuZ3RoXSA9IG5vZGVcclxuICAgICAgbm9kZS53b3JrZXIgPSAobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSA9PiB7XHJcbiAgICAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEuY2hlY2tlZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZS5hZGRDb250cm9sKG51bUNvbnRyb2wpLmFkZE91dHB1dChvdXQxKTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICBub2RlLndvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpXHJcbiAgIH0sXHJcbiAgIGxvZ2ljKHNlbGYpIHtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcyBpcyBhIHNvdXJjZSBzbyB3aGVuIGV2ZXIgaXQgYXNrcyBpZiBpdCBzaG91bGQgcHJvY1xyXG4gICB9XHJcbn0pO1xyXG4iLCJ2YXIgZXggPSB7XHJcbiAgQml0OiByZXF1aXJlKCcuL0JpdCcpLFxyXG4gIGFsbDogW11cclxufVxyXG5cclxuZXguYWxsLnB1c2goZXguQml0KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleFxyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiQU5EXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKFxyXG4gICAgICAgICAnPGlucHV0IHJlYWRvbmx5IHR5cGU9XCJjaGVja2JveFwiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIG5vZGUubXl3b3JrZXIgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICB2YXIgb3V0ID0gaW5wdXRzWzBdWzBdICYmIGlucHV0c1sxXVswXTtcclxuICAgICAgICAgZWRpdG9yLm5vZGVzLmZpbmQobiA9PiBuLmlkID09IG5vZGUuaWQpLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dCk7XHJcbiAgICAgICAgIG91dHB1dHNbMF0gPSBvdXQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgbm9kZS53b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKVxyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHZhciBvdXQgPSBzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpICYmIHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCk7XHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJ2YXIgZXggPSB7XHJcbiAgQU5EOiByZXF1aXJlKCcuL0FORCcpLFxyXG4gIC8vT1IgR2F0ZVxyXG4gIC8vT1I6IHJlcXVpcmUoJy4vT1InKSxcclxuICAvL05PVCBHYXRlXHJcbiAgLy9OT1Q6IHJlcXVpcmUoJy4vTk9UJyksXHJcbiAgLy9OQU5EIEdhdGVcclxuICAvL05BTkQ6IHJlcXVpcmUoJy4vTkFORCcpLFxyXG4gIC8vTk9SIEdhdGVcclxuICAvL05PUjogcmVxdWlyZSgnLi9OT1InKSxcclxuICAvL1hPUiBHYXRlXHJcbiAgLy9YT1I6IHJlcXVpcmUoJy4vWE9SJyksXHJcbiAgLy9YTk9SIEdhdGVcclxuICAvL1hOT1I6IHJlcXVpcmUoJy4vWE5PUicpXHJcbiAgYWxsOiBbXVxyXG59XHJcblxyXG5leC5hbGwucHVzaChleC5BTkQpXHJcbi8vZXguYWxsLnB1c2goZXguT1IpXHJcbi8vZXguYWxsLnB1c2goZXguTk9UKVxyXG4vL2V4LmFsbC5wdXNoKGV4Lk5BTkQpXHJcbi8vZXguYWxsLnB1c2goZXguTk9SKVxyXG4vL2V4LmFsbC5wdXNoKGV4LlhPUilcclxuLy9leC5hbGwucHVzaChleC5YTk9SKVxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4XHJcbiIsImNvbnN0IE15RWRpdG9yID0gcmVxdWlyZSgnLi4vLi4vaW5jbHVkZXMvTXlFZGl0b3InKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgQnVzOiBuZXcgRDNORS5Tb2NrZXQoXCJidXNcIiwgXCJuIEJpdCBCdXMgU29ja2V0XCIsIFwiaGludFwiKSxcclxuICBCaXQ6IG5ldyBEM05FLlNvY2tldChcImJpdFwiLCBcIjEgQml0IFNvY2tldFwiLCBcImhpbnRcIilcclxufVxyXG4iLCJ2YXIgZXggPSB7XHJcbiAgSW5wdXQ6IHJlcXVpcmUoJy4vSW5wdXQnKSxcclxuICBMb2dpYzogcmVxdWlyZSgnLi9Mb2dpYycpLFxyXG4gIFNvY2tldDogcmVxdWlyZSgnLi9Tb2NrZXRzJyksXHJcbiAgQWxsQ29tcG9uZW50czogW11cclxufVxyXG5cclxudmFyIGFkZENvbXBzID0gKGNvbXBzKSA9PiB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wcy5hbGwubGVuZ3RoOyBpKyspIHtcclxuICAgIGV4LkFsbENvbXBvbmVudHMucHVzaChjb21wcy5hbGxbaV0pXHJcbiAgfVxyXG59XHJcblxyXG5hZGRDb21wcyhleC5JbnB1dClcclxuYWRkQ29tcHMoZXguTG9naWMpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4XHJcbiIsImNvbnNvbGUubG9nKFwiV1RGISBZT1wiKVxyXG4vL3ZhciBEM05FID0gcmVxdWlyZShcImQzLW5vZGUtZWRpdG9yXCIpO1xyXG4vL3ZhciBhbGlnaHQgPSByZXF1aXJlKFwiLi9pbmNsdWRlcy9hbGlnaHRcIilcclxuXHJcbi8vdmFyIGFsaWdodCA9IG5SZXF1aXJlKFwiYWxpZ2h0XCIpO1xyXG4vL3ZhciBkMyA9IG5SZXF1aXJlKFwiZDNcIik7XHJcbi8vdmFyIEQzTkUgPSBuUmVxdWlyZShcImQzLW5vZGUtZWRpdG9yXCIpO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBhbGlnaHQgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2FsaWdodC9hbGlnaHQnXHJcbi8vaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2QzJ1xyXG4vL2ltcG9ydCAqIGFzIEQzTkUgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2QzLW5vZGUtZWRpdG9yL2J1aWxkL2QzLW5vZGUtZWRpdG9yJ1xyXG4vL2ltcG9ydCAqIGFzIGFsaWdodCBmcm9tICdhbGlnaHQnXHJcbi8vd2luZG93LmFsaWdodCA9IGFsaWdodCA9IHJlcXVpcmUoJ2FsaWdodCcpO1xyXG4vL3dpbmRvdy5kMyA9IGQzID0gcmVxdWlyZSgnZDMnKTtcclxuLy93aW5kb3cuRDNORSA9IEQzTkUgPSByZXF1aXJlKCdkMy1ub2RlLWVkaXRvcicpXHJcblxyXG5jb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4vaW5jbHVkZXMvTXlFZGl0b3InKVxyXG5jb25zdCBCdWlsZEluID0gcmVxdWlyZSgnLi9CdWlsdEluQ2hpcHMnKVxyXG53aW5kb3cuQnVpbGRJbiA9IEJ1aWxkSW5cclxuXHJcbndpbmRvdy5wcm9jTm9kZSA9IChub2RlKSA9PiB7XHJcbiAgaWYobm9kZS5pbnB1dHMubGVuZ3RoID4gMCl7XHJcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGUuaW5wdXRzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgIGlmKG5vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL25vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zWzBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5hbGxub2RlcyA9IFtdXHJcbi8vQml0IFVzZXJPdXRwdXRcclxuXHJcbi8vQU5EIEdhdGVcclxuLy9PUiBHYXRlXHJcbi8vTk9UIEdhdGVcclxuLy9OQU5EIEdhdGVcclxuLy9OT1IgR2F0ZVxyXG4vL1hPUiBHYXRlXHJcbi8vWE5PUiBHYXRlXHJcblxyXG5cclxuXHJcbi8qXHJcblxyXG52YXIgY29tcG9uZW50TnVtID0gbmV3IEQzTkUuQ29tcG9uZW50KFwiTnVtYmVyXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBvdXQxID0gbmV3IEQzTkUuT3V0cHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIj4nLFxyXG4gICAgICAgICAoZWwsIGMpID0+IHtcclxuICAgICAgICAgICAgZWwudmFsdWUgPSBjLmdldERhdGEoJ251bScpIHx8IDE7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGQoKSB7XHJcbiAgICAgICAgICAgICAgIGMucHV0RGF0YShcIm51bVwiLCBwYXJzZUZsb2F0KGVsLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgIGVkaXRvci5ldmVudExpc3RlbmVyLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGQpO1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTsvLyBwcmV2ZW50IG5vZGUgbW92ZW1lbnQgd2hlbiBzZWxlY3RpbmcgdGV4dCBpbiB0aGUgaW5wdXQgZmllbGRcclxuICAgICAgICAgICB1cGQoKTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGUuYWRkQ29udHJvbChudW1Db250cm9sKS5hZGRPdXRwdXQob3V0MSk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgb3V0cHV0c1swXSA9IG5vZGUuZGF0YS5udW07XHJcbiAgIH1cclxufSk7XHJcbnZhciBjb21wb25lbnRBZGQgPSBuZXcgRDNORS5Db21wb25lbnQoXCJBZGRcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgRDNORS5JbnB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgaW5wMiA9IG5ldyBEM05FLklucHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgRDNORS5PdXRwdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCByZWFkb25seSB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgbm9kZS53b3JrZXIgPSAobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSA9PiB7XHJcbiAgICAgICAgIHZhciBzdW0gPSBpbnB1dHNbMF1bMF0gKyBpbnB1dHNbMV1bMF07XHJcbiAgICAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShzdW0pO1xyXG4gICAgICAgICBvdXRwdXRzWzBdID0gc3VtO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAxKVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMilcclxuICAgICAgICAgLmFkZENvbnRyb2wobnVtQ29udHJvbClcclxuICAgICAgICAgLmFkZE91dHB1dChvdXQpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIHZhciBzdW0gPSBpbnB1dHNbMF1bMF0gKyBpbnB1dHNbMV1bMF07XHJcbiAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShzdW0pO1xyXG4gICAgICBvdXRwdXRzWzBdID0gc3VtO1xyXG4gICB9XHJcbn0pO1xyXG4qL1xyXG5cclxudmFyIG1lbnUgPSBuZXcgRDNORS5Db250ZXh0TWVudSh7XHJcbiAgVXNlcklucHV0OiB7XHJcbiAgICBCaXQ6QnVpbGRJbi5JbnB1dC5CaXRcclxuICB9LFxyXG4gIEJhc2ljX0dhdGVzOiB7XHJcbiAgICBBTkRfR2F0ZTpCdWlsZEluLkxvZ2ljLkFORFxyXG4gIH0vKixcclxuICBWYWx1ZXM6IHtcclxuICAgIFZhbHVlOiBjb21wb25lbnROdW0sXHJcbiAgICBBY3Rpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICBhbGVydChcIm9rXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgQWRkOiBjb21wb25lbnRBZGRcclxuICAgICovXHJcbn0pO1xyXG5cclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9kZUVkaXRvclwiKTtcclxuLy92YXIgY29tcG9uZW50cyA9IFtCdWlsZEluLklucHV0LkJpdCwgQnVpbGRJbi5Mb2dpYy5BTkRdO1xyXG52YXIgY29tcG9uZW50cyA9IEJ1aWxkSW4uQWxsQ29tcG9uZW50c1xyXG53aW5kb3cubm9kZUNvbXBzID0gY29tcG9uZW50c1xyXG52YXIgZWRpdG9yID0gbmV3IEQzTkUuTm9kZUVkaXRvcihcImRlbW9AMC4xLjBcIiwgY29udGFpbmVyLCBjb21wb25lbnRzLCBtZW51KTtcclxuLypcclxudmFyIG5uID0gY29tcG9uZW50TnVtLm5ld05vZGUoKTtcclxubm4uZGF0YS5udW0gPSAyO1xyXG52YXIgbjEgPSBjb21wb25lbnROdW0uYnVpbGRlcihubik7XHJcbnZhciBuMiA9IGNvbXBvbmVudE51bS5idWlsZGVyKGNvbXBvbmVudE51bS5uZXdOb2RlKCkpO1xyXG52YXIgYWRkID0gY29tcG9uZW50QWRkLmJ1aWxkZXIoY29tcG9uZW50QWRkLm5ld05vZGUoKSk7XHJcblxyXG5uMS5wb3NpdGlvbiA9IFs4MCwgMjAwXTtcclxubjIucG9zaXRpb24gPSBbODAsIDQwMF07XHJcbmFkZC5wb3NpdGlvbiA9IFs1MDAsIDI0MF07XHJcblxyXG5lZGl0b3IuY29ubmVjdChuMS5vdXRwdXRzWzBdLCBhZGQuaW5wdXRzWzBdKTtcclxuZWRpdG9yLmNvbm5lY3QobjIub3V0cHV0c1swXSwgYWRkLmlucHV0c1sxXSk7XHJcblxyXG5lZGl0b3IuYWRkTm9kZShuMSk7XHJcbmVkaXRvci5hZGROb2RlKG4yKTtcclxuZWRpdG9yLmFkZE5vZGUoYWRkKTtcclxuKi9cclxuLy8gIGVkaXRvci5zZWxlY3ROb2RlKHRub2RlKTtcclxuXHJcbnZhciBlbmdpbmUgPSBuZXcgRDNORS5FbmdpbmUoXCJkZW1vQDAuMS4wXCIsIGNvbXBvbmVudHMpO1xyXG5lZGl0b3IuZXZlbnRMaXN0ZW5lci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy9lbmdpbmUucHJvY2VzcyhlZGl0b3IudG9KU09OKCksbnVsbCk7IC8vIGltYWdpbmUgdGhhdCBpdCBjb3VsZCB0YWtlIG9uZSBzZWNvbmQgb2YgdGltZVxyXG59KTtcclxuLypcclxuKi9cclxuZWRpdG9yLnZpZXcuem9vbUF0KGVkaXRvci5ub2Rlcyk7XHJcbi8vZWRpdG9yLmV2ZW50TGlzdGVuZXIudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuZWRpdG9yLnZpZXcucmVzaXplKCk7XHJcbiIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9Ob2RlJylcclxuXHJcbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIEQzTkUuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgcHJvcHMpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBwcm9wcylcclxuICAgIHRoaXMubG9naWMgPSBwcm9wcy5sb2dpY1xyXG4gIH1cclxuXHJcbiAgbmV3Tm9kZSgpIHtcclxuICAgIHJldHVybiBuZXcgTm9kZSh0aGlzLm5hbWUsIHRoaXMubG9naWMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRcclxuIiwiY2xhc3MgSW5wdXQgZXh0ZW5kcyBEM05FLklucHV0IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgc29ja2V0LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBzb2NrZXQpXHJcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICAvL3JldHVybiBhbGxub2Rlc1sxXS5pbnB1dHNbMF0uY29ubmVjdGlvbnNbMF0ub3V0cHV0LnZhbHVlXHJcbiAgICBpZih0aGlzLmNvbm5lY3Rpb25zLmxlbmd0aCA9PSAwKSByZXR1cm4gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uc1swXS5vdXRwdXQudmFsdWVcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXRcclxuIiwiY2xhc3MgTm9kZSBleHRlbmRzIEQzTkUuTm9kZSB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGxvZ2ljKSB7XHJcbiAgICBzdXBlcih0aXRsZSlcclxuICAgIHRoaXMubG9naWMgPSBsb2dpY1xyXG4gIH1cclxuXHJcbiAgcHJvY0xvZ2ljKCkge1xyXG4gICAgLy9pZiBjaGFuZ2VkIHVwZGF0ZSBsb2dpYyBkb3duIHRoaXMgYnJhbmNoIHRvIGl0cyBvdXRwdXQgY29ubmVjdGlvbnNcclxuICAgIGlmKHRoaXMubG9naWMgIT0gbnVsbCAmJiB0aGlzLmxvZ2ljKHRoaXMpKVxyXG4gICAgICBmb3IgKHZhciBvID0gMDsgbyA8IHRoaXMub3V0cHV0cy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgIGlmKHRoaXMub3V0cHV0c1tvXS5jb25uZWN0aW9ucy5sZW5ndGggPT0gMCkgY29udGludWUgLy9Ob3QgY29ubmVjdGVkIG1vdmUgdG8gbmV4dCBvdXRwdXRcclxuXHJcbiAgICAgICAgdGhpcy5vdXRwdXRzW29dLmNvbm5lY3Rpb25zWzBdLmlucHV0Lm5vZGUucHJvY0xvZ2ljKCkgLy9JcyBjb25uZWN0ZWQgY2hhaW4gZG93biBsb2dpYyB1cGRhdGVcclxuICAgICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOb2RlXHJcbiIsImNsYXNzIE91dHB1dCBleHRlbmRzIEQzTkUuT3V0cHV0IHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgc29ja2V0LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHN1cGVyKHRpdGxlLCBzb2NrZXQpXHJcbiAgICB0aGlzLnZhbHVlID0gZGVmYXVsdFZhbHVlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE91dHB1dFxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBJbnB1dDogcmVxdWlyZSgnLi9JbnB1dCcpLFxyXG4gIE91dHB1dDogcmVxdWlyZSgnLi9PdXRwdXQnKSxcclxuICBDb21wb25lbnQ6IHJlcXVpcmUoJy4vQ29tcG9uZW50JyksXHJcbiAgTm9kZTogcmVxdWlyZSgnLi9Ob2RlJylcclxufVxyXG4iXX0=
