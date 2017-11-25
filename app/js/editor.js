(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("Bit (User Input)", {
   builder(node) {
      var out1 = new MyEditor.Output("Bit", Socket.Bit);
      var numControl = new D3NE.Control('<input class="bit" type="checkbox">',
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


},{"../../includes/MyEditor":14,"../Sockets":7}],2:[function(require,module,exports){
var ex = {
  Bit: require('./Bit')
}

module.exports = ex


},{"./Bit":1}],3:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("AND (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit);

      var numControl = new D3NE.Control(
         '<input class="bit" type="checkbox" onclick="return false;">',
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


},{"../../includes/MyEditor":14,"../Sockets":7}],4:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("NOT (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("In", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit);
      out.value = true;

      var numControl = new D3NE.Control(
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
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":14,"../Sockets":7}],5:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("OR (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit);

      var numControl = new D3NE.Control(
         '<input  class="bit" type="checkbox" onclick="return false;">',
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
      var out = self.inputs[0].getValue() || self.inputs[1].getValue();
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":14,"../Sockets":7}],6:[function(require,module,exports){
var ex = {
  AND: require('./AND'),
  //OR Gate
  OR: require('./OR'),
  //NOT Gate
  NOT: require('./NOT'),
  //NAND Gate
  //NAND: require('./NAND'),
  //NOR Gate
  //NOR: require('./NOR'),
  //XOR Gate
  //XOR: require('./XOR'),
  //XNOR Gate
  //XNOR: require('./XNOR')
  //all: []
}

//ex.all.push(ex.AND)
//ex.all.push(ex.OR)
//ex.all.push(ex.NOT)
//ex.all.push(ex.NAND)
//ex.all.push(ex.NOR)
//ex.all.push(ex.XOR)
//ex.all.push(ex.XNOR)
module.exports = ex


},{"./AND":3,"./NOT":4,"./OR":5}],7:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')

module.exports = {
  Bus: new D3NE.Socket("bus", "n Bit Bus Socket", "hint"),
  Bit: new D3NE.Socket("bit", "1 Bit Socket", "hint")
}


},{"../../includes/MyEditor":14}],8:[function(require,module,exports){
var ex = {
  Input: require('./Input'),
  Logic: require('./Logic'),
  Socket: require('./Sockets'),
  AllComponents: []
}

var addComps = (comps) => {
  for (var key in comps) {
    ex.AllComponents.push(comps[key])
  }
}

addComps(ex.Input)
addComps(ex.Logic)

module.exports = ex


},{"./Input":2,"./Logic":6,"./Sockets":7}],9:[function(require,module,exports){
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
  UserInput:BuildIn.Input,
  Basic_Gates:BuildIn.Logic/*,
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

editor.eventListener.on('connectioncreate', (param) => {
  //console.log(param)
  setTimeout(()=>{param.input.node.procLogic()}, 10);
});
editor.eventListener.on('connectionremove', (param) => {
  //console.log(param)
  setTimeout(()=>{param.input.node.procLogic()}, 10);
});

/*
*/
editor.view.zoomAt(editor.nodes);
//editor.eventListener.trigger("change");
editor.view.resize();


},{"./BuiltInChips":8,"./includes/MyEditor":14}],10:[function(require,module,exports){
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


},{"./Node":12}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
class Output extends D3NE.Output {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.value = defaultValue
  }
}

module.exports = Output


},{}],14:[function(require,module,exports){
module.exports = {
  Input: require('./Input'),
  Output: require('./Output'),
  Component: require('./Component'),
  Node: require('./Node')
}


},{"./Component":10,"./Input":11,"./Node":12,"./Output":13}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXElucHV0XFxCaXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxJbnB1dFxcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxMb2dpY1xcQU5ELmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcTG9naWNcXE5PVC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXExvZ2ljXFxPUi5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXExvZ2ljXFxpbmRleC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXFNvY2tldHNcXGluZGV4LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcZmFrZV9lNGM5NDg1Yy5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXENvbXBvbmVudC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXElucHV0LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXGluY2x1ZGVzXFxNeUVkaXRvclxcTm9kZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXE91dHB1dC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDO0FBQ25ELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7O0FBRWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFO0dBQ3pELE9BQU8sT0FBTztNQUNYLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2xELElBQUksVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUM7U0FDcEUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLO0FBQ3BCLFlBQVksRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUVsQyxTQUFTLEdBQUcsR0FBRztjQUNiLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNsQyxlQUFlOztBQUVmLGFBQWE7O0FBRWIsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztXQUVwQyxHQUFHLEVBQUUsQ0FBQztVQUNQO0FBQ1YsT0FBTyxDQUFDOztNQUVGLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJO01BQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sS0FBSztTQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7T0FDakM7TUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JEO0dBQ0QsTUFBTSx3QkFBd0I7TUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztJQUNwQztHQUNELEtBQUssT0FBTztNQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2Q7Q0FDSCxDQUFDLENBQUM7Ozs7QUNwQ0gsSUFBSSxFQUFFLEdBQUc7RUFDUCxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRTs7OztBQ0puQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7QUFDbkQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQzs7QUFFbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7R0FDdkQsT0FBTyxPQUFPO01BQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ3RELElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RCxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztNQUVqRCxJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzlCLDZEQUE2RDtTQUM3RCxDQUFDLEVBQUUsRUFBRSxPQUFPLEtBQUs7WUFDZCxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSTtlQUN2QixFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzthQUNuQixDQUFDO1VBQ0o7T0FDSCxDQUFDO01BQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUk7TUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksS0FBSztTQUN2QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7T0FDbkI7TUFDRCxPQUFPLElBQUk7VUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDO1VBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQztVQUNkLFVBQVUsQ0FBQyxVQUFVLENBQUM7VUFDdEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCO0dBQ0QsTUFBTSx3QkFBd0I7TUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztJQUNwQztHQUNELEtBQUssT0FBTztNQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztNQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7TUFDOUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUM7TUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO01BQzVCLE9BQU8sSUFBSSxDQUFDO0lBQ2Q7Q0FDSCxDQUFDLENBQUM7Ozs7QUN2Q0gsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDO0FBQ25ELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7O0FBRWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFO0dBQ3ZELE9BQU8sT0FBTztNQUNYLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztNQUN2RCxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RCxNQUFNLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztNQUVqQixJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzlCLHFFQUFxRTtTQUNyRSxDQUFDLEVBQUUsRUFBRSxPQUFPLEtBQUs7WUFDZCxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSTtlQUN2QixFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzthQUNuQixDQUFDO1VBQ0o7QUFDVixPQUFPLENBQUM7O01BRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUk7TUFDOUMsT0FBTyxJQUFJO1VBQ1AsUUFBUSxDQUFDLElBQUksQ0FBQztVQUNkLFVBQVUsQ0FBQyxVQUFVLENBQUM7VUFDdEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCO0dBQ0QsTUFBTSx3QkFBd0I7SUFDN0I7R0FDRCxLQUFLLE9BQU87TUFDVCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO01BQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztNQUM5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQztNQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7TUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDZDtDQUNILENBQUMsQ0FBQzs7OztBQ2pDSCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7QUFDbkQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQzs7QUFFbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO0dBQ3RELE9BQU8sT0FBTztNQUNYLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztNQUN0RCxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7TUFFakQsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTztTQUM5Qiw4REFBOEQ7U0FDOUQsQ0FBQyxFQUFFLEVBQUUsT0FBTyxLQUFLO1lBQ2QsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHLElBQUk7ZUFDdkIsRUFBRSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7YUFDbkIsQ0FBQztVQUNKO09BQ0gsQ0FBQztNQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJO01BQzlDLE9BQU8sSUFBSTtVQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUM7VUFDZCxRQUFRLENBQUMsSUFBSSxDQUFDO1VBQ2QsVUFBVSxDQUFDLFVBQVUsQ0FBQztVQUN0QixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckI7R0FDRCxNQUFNLHdCQUF3QjtJQUM3QjtHQUNELEtBQUssT0FBTztNQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztNQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7TUFDOUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUM7TUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO01BQzVCLE9BQU8sSUFBSSxDQUFDO0lBQ2Q7Q0FDSCxDQUFDLENBQUM7Ozs7QUNqQ0gsSUFBSSxFQUFFLEdBQUc7QUFDVCxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDOztBQUV2QixFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUVyQixFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxxQkFBcUI7QUFDckIsb0JBQW9CO0FBQ3BCLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFOzs7O0FDeEJuQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxPQUFPLEdBQUc7RUFDZixHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUM7RUFDdkQsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztDQUNwRDs7OztBQ0xELElBQUksRUFBRSxHQUFHO0VBQ1AsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUM7RUFDekIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUM7RUFDekIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7RUFDNUIsYUFBYSxFQUFFLEVBQUU7QUFDbkIsQ0FBQzs7QUFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSztFQUN4QixLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtJQUNyQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDbEM7QUFDSCxDQUFDOztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ2xCLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOztBQUVsQixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUU7Ozs7QUNoQm5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ3RCLHVDQUF1QztBQUN2QywyQ0FBMkM7O0FBRTNDLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIsd0NBQXdDOztBQUV4Qyw0REFBNEQ7QUFDNUQsNkNBQTZDO0FBQzdDLGdGQUFnRjtBQUNoRixrQ0FBa0M7QUFDbEMsNkNBQTZDO0FBQzdDLGlDQUFpQztBQUNqQyxnREFBZ0Q7O0FBRWhELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztBQUMvQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7QUFDekMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPOztBQUV4QixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxLQUFLO0VBQzFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNqRCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7T0FFekM7S0FDRjtHQUNGO0FBQ0gsQ0FBQzs7QUFFRCxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUU7QUFDcEIsZ0JBQWdCOztBQUVoQixVQUFVO0FBQ1YsU0FBUztBQUNULFVBQVU7QUFDVixXQUFXO0FBQ1gsVUFBVTtBQUNWLFVBQVU7QUFDVixXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7RUFDOUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQ3pCLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsQ0FBQyxDQUFDOztBQUVILElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEQsMERBQTBEO0FBQzFELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhO0FBQ3RDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVTtBQUM3QixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0VBRUU7QUFDRiw2QkFBNkI7O0FBRTdCLElBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU07O0FBRXhDLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsS0FBSyxLQUFLOztFQUVyRCxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEtBQUs7O0VBRXJELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQzs7QUFFSDtFQUNFO0FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLHlDQUF5QztBQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7O0FDL0pyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDOztBQUU1QixNQUFNLFNBQVMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDO0VBQ3JDLFdBQVcsZUFBZTtJQUN4QixLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLO0FBQzVCLEdBQUc7O0VBRUQsT0FBTyxHQUFHO0lBQ1IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUN4QztBQUNILENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTOzs7O0FDYjFCLE1BQU0sS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDN0IsV0FBVyw4QkFBOEI7SUFDdkMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7SUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZO0FBQ3BDLEdBQUc7O0FBRUgsRUFBRSxRQUFRLEdBQUc7O0FBRWIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxZQUFZOztJQUV6RCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7R0FDeEM7QUFDSCxDQUFDOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSzs7OztBQ2R0QixNQUFNLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQzNCLFdBQVcsZUFBZTtJQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLO0FBQ3RCLEdBQUc7O0FBRUgsRUFBRSxTQUFTLEdBQUc7O0lBRVYsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztNQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEQsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsUUFBUTs7UUFFcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7T0FDdEQ7R0FDSjtBQUNILENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJOzs7O0FDakJyQixNQUFNLE1BQU0sU0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQy9CLFdBQVcsOEJBQThCO0lBQ3ZDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWTtHQUMxQjtBQUNILENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOzs7O0FDUHZCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7RUFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQztFQUN6QixNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQztFQUMzQixTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztFQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUN4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiQml0IChVc2VyIElucHV0KVwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBNeUVkaXRvci5PdXRwdXQoXCJCaXRcIiwgU29ja2V0LkJpdCk7XHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbCgnPGlucHV0IGNsYXNzPVwiYml0XCIgdHlwZT1cImNoZWNrYm94XCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLmNoZWNrZWQgPSBjLmdldERhdGEoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZCgpIHtcclxuICAgICAgICAgICAgICBpZihvdXQxLnZhbHVlICE9IGVsLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgIG91dDEudmFsdWUgPSBlbC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgIG5vZGUucHJvY0xvZ2ljKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAvL2VkaXRvci5ldmVudExpc3RlbmVyLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkKTtcclxuICAgICAgICAgICAgLy9lbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTsvLyBwcmV2ZW50IG5vZGUgbW92ZW1lbnQgd2hlbiBzZWxlY3RpbmcgdGV4dCBpbiB0aGUgaW5wdXQgZmllbGRcclxuICAgICAgICAgICB1cGQoKTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgd2luZG93LmFsbG5vZGVzW3dpbmRvdy5hbGxub2Rlcy5sZW5ndGhdID0gbm9kZVxyXG4gICAgICBub2RlLndvcmtlciA9IChub2RlLCBpbnB1dHMsIG91dHB1dHMpID0+IHtcclxuICAgICAgICAgb3V0cHV0c1swXSA9IG5vZGUuZGF0YS5jaGVja2VkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBub2RlLmFkZENvbnRyb2wobnVtQ29udHJvbCkuYWRkT3V0cHV0KG91dDEpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG5vZGUud29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cylcclxuICAgfSxcclxuICAgbG9naWMoc2VsZikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy90aGlzIGlzIGEgc291cmNlIHNvIHdoZW4gZXZlciBpdCBhc2tzIGlmIGl0IHNob3VsZCBwcm9jXHJcbiAgIH1cclxufSk7XHJcbiIsInZhciBleCA9IHtcclxuICBCaXQ6IHJlcXVpcmUoJy4vQml0JylcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleFxyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiQU5EIChCdWlsdC1JbilcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgTXlFZGl0b3IuSW5wdXQoXCJBXCIsIFNvY2tldC5CaXQsIGZhbHNlKTtcclxuICAgICAgdmFyIGlucDIgPSBuZXcgTXlFZGl0b3IuSW5wdXQoXCJCXCIsIFNvY2tldC5CaXQsIGZhbHNlKTtcclxuICAgICAgdmFyIG91dCA9IG5ldyBNeUVkaXRvci5PdXRwdXQoXCJPdXRcIiwgU29ja2V0LkJpdCk7XHJcblxyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIG5vZGUubXl3b3JrZXIgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICB2YXIgb3V0ID0gaW5wdXRzWzBdWzBdICYmIGlucHV0c1sxXVswXTtcclxuICAgICAgICAgZWRpdG9yLm5vZGVzLmZpbmQobiA9PiBuLmlkID09IG5vZGUuaWQpLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dCk7XHJcbiAgICAgICAgIG91dHB1dHNbMF0gPSBvdXQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgbm9kZS53b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKVxyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHZhciBvdXQgPSBzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpICYmIHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCk7XHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiTk9UIChCdWlsdC1JbilcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgTXlFZGl0b3IuSW5wdXQoXCJJblwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQpO1xyXG4gICAgICBvdXQudmFsdWUgPSB0cnVlO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKFxyXG4gICAgICAgICAnPGlucHV0IGNsYXNzPVwiYml0XCIgdHlwZT1cImNoZWNrYm94XCIgb25jbGljaz1cInJldHVybiBmYWxzZTtcIiBjaGVja2VkPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICAvL1NldCB0byB0cnVlIGJlIGNhdXNlIHN0YXJ0aW5nIG91dCBpbnB1dCBkZWZhdWx0cyB0byBmYWxzZSB0aHVzIE5PVCBmYWxzZSBpcyB0aGUgc3RhdGUgd2l0aG91dCBhbnkgY29ubmVjdGlvbnNcclxuICAgICAgd2luZG93LmFsbG5vZGVzW3dpbmRvdy5hbGxub2Rlcy5sZW5ndGhdID0gbm9kZVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZENvbnRyb2wobnVtQ29udHJvbClcclxuICAgICAgICAgLmFkZE91dHB1dChvdXQpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgIH0sXHJcbiAgIGxvZ2ljKHNlbGYpIHtcclxuICAgICAgdmFyIG91dCA9ICFzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpXHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiT1IgKEJ1aWx0LUluKVwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgaW5wMSA9IG5ldyBNeUVkaXRvci5JbnB1dChcIkFcIiwgU29ja2V0LkJpdCwgZmFsc2UpO1xyXG4gICAgICB2YXIgaW5wMiA9IG5ldyBNeUVkaXRvci5JbnB1dChcIkJcIiwgU29ja2V0LkJpdCwgZmFsc2UpO1xyXG4gICAgICB2YXIgb3V0ID0gbmV3IE15RWRpdG9yLk91dHB1dChcIk91dFwiLCBTb2NrZXQuQml0KTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCAgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAxKVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMilcclxuICAgICAgICAgLmFkZENvbnRyb2wobnVtQ29udHJvbClcclxuICAgICAgICAgLmFkZE91dHB1dChvdXQpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgIH0sXHJcbiAgIGxvZ2ljKHNlbGYpIHtcclxuICAgICAgdmFyIG91dCA9IHNlbGYuaW5wdXRzWzBdLmdldFZhbHVlKCkgfHwgc2VsZi5pbnB1dHNbMV0uZ2V0VmFsdWUoKTtcclxuICAgICAgc2VsZi5jb250cm9sc1swXS5zZXRWYWx1ZShvdXQpXHJcbiAgICAgIGlmKHNlbGYub3V0cHV0c1swXS52YWx1ZSA9PSBvdXQpIHJldHVybiBmYWxzZTsgLy9XYXMgdW5jaGFuZ2VkIHRlbGwgcHJvY1VwZGF0ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHVwZGF0ZVxyXG4gICAgICBzZWxmLm91dHB1dHNbMF0udmFsdWUgPSBvdXQ7XHJcbiAgICAgIHJldHVybiB0cnVlOyAvL1dhcyBDaGFuZ2VkIHNvIHJldHVybiB0cnVlXHJcbiAgIH1cclxufSk7XHJcbiIsInZhciBleCA9IHtcclxuICBBTkQ6IHJlcXVpcmUoJy4vQU5EJyksXHJcbiAgLy9PUiBHYXRlXHJcbiAgT1I6IHJlcXVpcmUoJy4vT1InKSxcclxuICAvL05PVCBHYXRlXHJcbiAgTk9UOiByZXF1aXJlKCcuL05PVCcpLFxyXG4gIC8vTkFORCBHYXRlXHJcbiAgLy9OQU5EOiByZXF1aXJlKCcuL05BTkQnKSxcclxuICAvL05PUiBHYXRlXHJcbiAgLy9OT1I6IHJlcXVpcmUoJy4vTk9SJyksXHJcbiAgLy9YT1IgR2F0ZVxyXG4gIC8vWE9SOiByZXF1aXJlKCcuL1hPUicpLFxyXG4gIC8vWE5PUiBHYXRlXHJcbiAgLy9YTk9SOiByZXF1aXJlKCcuL1hOT1InKVxyXG4gIC8vYWxsOiBbXVxyXG59XHJcblxyXG4vL2V4LmFsbC5wdXNoKGV4LkFORClcclxuLy9leC5hbGwucHVzaChleC5PUilcclxuLy9leC5hbGwucHVzaChleC5OT1QpXHJcbi8vZXguYWxsLnB1c2goZXguTkFORClcclxuLy9leC5hbGwucHVzaChleC5OT1IpXHJcbi8vZXguYWxsLnB1c2goZXguWE9SKVxyXG4vL2V4LmFsbC5wdXNoKGV4LlhOT1IpXHJcbm1vZHVsZS5leHBvcnRzID0gZXhcclxuIiwiY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuLi8uLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBCdXM6IG5ldyBEM05FLlNvY2tldChcImJ1c1wiLCBcIm4gQml0IEJ1cyBTb2NrZXRcIiwgXCJoaW50XCIpLFxyXG4gIEJpdDogbmV3IEQzTkUuU29ja2V0KFwiYml0XCIsIFwiMSBCaXQgU29ja2V0XCIsIFwiaGludFwiKVxyXG59XHJcbiIsInZhciBleCA9IHtcclxuICBJbnB1dDogcmVxdWlyZSgnLi9JbnB1dCcpLFxyXG4gIExvZ2ljOiByZXF1aXJlKCcuL0xvZ2ljJyksXHJcbiAgU29ja2V0OiByZXF1aXJlKCcuL1NvY2tldHMnKSxcclxuICBBbGxDb21wb25lbnRzOiBbXVxyXG59XHJcblxyXG52YXIgYWRkQ29tcHMgPSAoY29tcHMpID0+IHtcclxuICBmb3IgKHZhciBrZXkgaW4gY29tcHMpIHtcclxuICAgIGV4LkFsbENvbXBvbmVudHMucHVzaChjb21wc1trZXldKVxyXG4gIH1cclxufVxyXG5cclxuYWRkQ29tcHMoZXguSW5wdXQpXHJcbmFkZENvbXBzKGV4LkxvZ2ljKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleFxyXG4iLCJjb25zb2xlLmxvZyhcIldURiEgWU9cIilcclxuLy92YXIgRDNORSA9IHJlcXVpcmUoXCJkMy1ub2RlLWVkaXRvclwiKTtcclxuLy92YXIgYWxpZ2h0ID0gcmVxdWlyZShcIi4vaW5jbHVkZXMvYWxpZ2h0XCIpXHJcblxyXG4vL3ZhciBhbGlnaHQgPSBuUmVxdWlyZShcImFsaWdodFwiKTtcclxuLy92YXIgZDMgPSBuUmVxdWlyZShcImQzXCIpO1xyXG4vL3ZhciBEM05FID0gblJlcXVpcmUoXCJkMy1ub2RlLWVkaXRvclwiKTtcclxuXHJcbi8vaW1wb3J0ICogYXMgYWxpZ2h0IGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9hbGlnaHQvYWxpZ2h0J1xyXG4vL2ltcG9ydCAqIGFzIGQzIGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9kMydcclxuLy9pbXBvcnQgKiBhcyBEM05FIGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9kMy1ub2RlLWVkaXRvci9idWlsZC9kMy1ub2RlLWVkaXRvcidcclxuLy9pbXBvcnQgKiBhcyBhbGlnaHQgZnJvbSAnYWxpZ2h0J1xyXG4vL3dpbmRvdy5hbGlnaHQgPSBhbGlnaHQgPSByZXF1aXJlKCdhbGlnaHQnKTtcclxuLy93aW5kb3cuZDMgPSBkMyA9IHJlcXVpcmUoJ2QzJyk7XHJcbi8vd2luZG93LkQzTkUgPSBEM05FID0gcmVxdWlyZSgnZDMtbm9kZS1lZGl0b3InKVxyXG5cclxuY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuL2luY2x1ZGVzL015RWRpdG9yJylcclxuY29uc3QgQnVpbGRJbiA9IHJlcXVpcmUoJy4vQnVpbHRJbkNoaXBzJylcclxud2luZG93LkJ1aWxkSW4gPSBCdWlsZEluXHJcblxyXG53aW5kb3cucHJvY05vZGUgPSAobm9kZSkgPT4ge1xyXG4gIGlmKG5vZGUuaW5wdXRzLmxlbmd0aCA+IDApe1xyXG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCBub2RlLmlucHV0cy5sZW5ndGg7IG4rKykge1xyXG4gICAgICBpZihub2RlLmlucHV0c1tuXS5jb25uZWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy9ub2RlLmlucHV0c1tuXS5jb25uZWN0aW9uc1swXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuYWxsbm9kZXMgPSBbXVxyXG4vL0JpdCBVc2VyT3V0cHV0XHJcblxyXG4vL0FORCBHYXRlXHJcbi8vT1IgR2F0ZVxyXG4vL05PVCBHYXRlXHJcbi8vTkFORCBHYXRlXHJcbi8vTk9SIEdhdGVcclxuLy9YT1IgR2F0ZVxyXG4vL1hOT1IgR2F0ZVxyXG5cclxuXHJcblxyXG4vKlxyXG5cclxudmFyIGNvbXBvbmVudE51bSA9IG5ldyBEM05FLkNvbXBvbmVudChcIk51bWJlclwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woJzxpbnB1dCB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnZhbHVlID0gYy5nZXREYXRhKCdudW0nKSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkKCkge1xyXG4gICAgICAgICAgICAgICBjLnB1dERhdGEoXCJudW1cIiwgcGFyc2VGbG9hdChlbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICBlZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkKTtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlLmFkZENvbnRyb2wobnVtQ29udHJvbCkuYWRkT3V0cHV0KG91dDEpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEubnVtO1xyXG4gICB9XHJcbn0pO1xyXG52YXIgY29tcG9uZW50QWRkID0gbmV3IEQzTkUuQ29tcG9uZW50KFwiQWRkXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IEQzTkUuSW5wdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuICAgICAgdmFyIGlucDIgPSBuZXcgRDNORS5JbnB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgb3V0ID0gbmV3IEQzTkUuT3V0cHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcblxyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgcmVhZG9ubHkgdHlwZT1cIm51bWJlclwiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIG5vZGUud29ya2VyID0gKG5vZGUsIGlucHV0cywgb3V0cHV0cykgPT4ge1xyXG4gICAgICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgfVxyXG59KTtcclxuKi9cclxuXHJcbnZhciBtZW51ID0gbmV3IEQzTkUuQ29udGV4dE1lbnUoe1xyXG4gIFVzZXJJbnB1dDpCdWlsZEluLklucHV0LFxyXG4gIEJhc2ljX0dhdGVzOkJ1aWxkSW4uTG9naWMvKixcclxuICBWYWx1ZXM6IHtcclxuICAgIFZhbHVlOiBjb21wb25lbnROdW0sXHJcbiAgICBBY3Rpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICBhbGVydChcIm9rXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgQWRkOiBjb21wb25lbnRBZGRcclxuICAgICovXHJcbn0pO1xyXG5cclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9kZUVkaXRvclwiKTtcclxuLy92YXIgY29tcG9uZW50cyA9IFtCdWlsZEluLklucHV0LkJpdCwgQnVpbGRJbi5Mb2dpYy5BTkRdO1xyXG52YXIgY29tcG9uZW50cyA9IEJ1aWxkSW4uQWxsQ29tcG9uZW50c1xyXG53aW5kb3cubm9kZUNvbXBzID0gY29tcG9uZW50c1xyXG52YXIgZWRpdG9yID0gbmV3IEQzTkUuTm9kZUVkaXRvcihcImRlbW9AMC4xLjBcIiwgY29udGFpbmVyLCBjb21wb25lbnRzLCBtZW51KTtcclxuLypcclxudmFyIG5uID0gY29tcG9uZW50TnVtLm5ld05vZGUoKTtcclxubm4uZGF0YS5udW0gPSAyO1xyXG52YXIgbjEgPSBjb21wb25lbnROdW0uYnVpbGRlcihubik7XHJcbnZhciBuMiA9IGNvbXBvbmVudE51bS5idWlsZGVyKGNvbXBvbmVudE51bS5uZXdOb2RlKCkpO1xyXG52YXIgYWRkID0gY29tcG9uZW50QWRkLmJ1aWxkZXIoY29tcG9uZW50QWRkLm5ld05vZGUoKSk7XHJcblxyXG5uMS5wb3NpdGlvbiA9IFs4MCwgMjAwXTtcclxubjIucG9zaXRpb24gPSBbODAsIDQwMF07XHJcbmFkZC5wb3NpdGlvbiA9IFs1MDAsIDI0MF07XHJcblxyXG5lZGl0b3IuY29ubmVjdChuMS5vdXRwdXRzWzBdLCBhZGQuaW5wdXRzWzBdKTtcclxuZWRpdG9yLmNvbm5lY3QobjIub3V0cHV0c1swXSwgYWRkLmlucHV0c1sxXSk7XHJcblxyXG5lZGl0b3IuYWRkTm9kZShuMSk7XHJcbmVkaXRvci5hZGROb2RlKG4yKTtcclxuZWRpdG9yLmFkZE5vZGUoYWRkKTtcclxuKi9cclxuLy8gIGVkaXRvci5zZWxlY3ROb2RlKHRub2RlKTtcclxuXHJcbnZhciBlbmdpbmUgPSBuZXcgRDNORS5FbmdpbmUoXCJkZW1vQDAuMS4wXCIsIGNvbXBvbmVudHMpO1xyXG5lZGl0b3IuZXZlbnRMaXN0ZW5lci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy9lbmdpbmUucHJvY2VzcyhlZGl0b3IudG9KU09OKCksbnVsbCk7IC8vIGltYWdpbmUgdGhhdCBpdCBjb3VsZCB0YWtlIG9uZSBzZWNvbmQgb2YgdGltZVxyXG59KTtcclxuXHJcbmVkaXRvci5ldmVudExpc3RlbmVyLm9uKCdjb25uZWN0aW9uY3JlYXRlJywgKHBhcmFtKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhwYXJhbSlcclxuICBzZXRUaW1lb3V0KCgpPT57cGFyYW0uaW5wdXQubm9kZS5wcm9jTG9naWMoKX0sIDEwKTtcclxufSk7XHJcbmVkaXRvci5ldmVudExpc3RlbmVyLm9uKCdjb25uZWN0aW9ucmVtb3ZlJywgKHBhcmFtKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhwYXJhbSlcclxuICBzZXRUaW1lb3V0KCgpPT57cGFyYW0uaW5wdXQubm9kZS5wcm9jTG9naWMoKX0sIDEwKTtcclxufSk7XHJcblxyXG4vKlxyXG4qL1xyXG5lZGl0b3Iudmlldy56b29tQXQoZWRpdG9yLm5vZGVzKTtcclxuLy9lZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG5lZGl0b3Iudmlldy5yZXNpemUoKTtcclxuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKVxyXG5cclxuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRDNORS5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBwcm9wcykge1xyXG4gICAgc3VwZXIodGl0bGUsIHByb3BzKVxyXG4gICAgdGhpcy5sb2dpYyA9IHByb3BzLmxvZ2ljXHJcbiAgfVxyXG5cclxuICBuZXdOb2RlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBOb2RlKHRoaXMubmFtZSwgdGhpcy5sb2dpYyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxyXG4iLCJjbGFzcyBJbnB1dCBleHRlbmRzIEQzTkUuSW5wdXQge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBzb2NrZXQsIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgc3VwZXIodGl0bGUsIHNvY2tldClcclxuICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlXHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZSgpIHtcclxuICAgIC8vcmV0dXJuIGFsbG5vZGVzWzFdLmlucHV0c1swXS5jb25uZWN0aW9uc1swXS5vdXRwdXQudmFsdWVcclxuICAgIGlmKHRoaXMuY29ubmVjdGlvbnMubGVuZ3RoID09IDApIHJldHVybiB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25zWzBdLm91dHB1dC52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFxyXG4iLCJjbGFzcyBOb2RlIGV4dGVuZHMgRDNORS5Ob2RlIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgbG9naWMpIHtcclxuICAgIHN1cGVyKHRpdGxlKVxyXG4gICAgdGhpcy5sb2dpYyA9IGxvZ2ljXHJcbiAgfVxyXG5cclxuICBwcm9jTG9naWMoKSB7XHJcbiAgICAvL2lmIGNoYW5nZWQgdXBkYXRlIGxvZ2ljIGRvd24gdGhpcyBicmFuY2ggdG8gaXRzIG91dHB1dCBjb25uZWN0aW9uc1xyXG4gICAgaWYodGhpcy5sb2dpYyAhPSBudWxsICYmIHRoaXMubG9naWModGhpcykpXHJcbiAgICAgIGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5vdXRwdXRzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgaWYodGhpcy5vdXRwdXRzW29dLmNvbm5lY3Rpb25zLmxlbmd0aCA9PSAwKSBjb250aW51ZSAvL05vdCBjb25uZWN0ZWQgbW92ZSB0byBuZXh0IG91dHB1dFxyXG5cclxuICAgICAgICB0aGlzLm91dHB1dHNbb10uY29ubmVjdGlvbnNbMF0uaW5wdXQubm9kZS5wcm9jTG9naWMoKSAvL0lzIGNvbm5lY3RlZCBjaGFpbiBkb3duIGxvZ2ljIHVwZGF0ZVxyXG4gICAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVcclxuIiwiY2xhc3MgT3V0cHV0IGV4dGVuZHMgRDNORS5PdXRwdXQge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBzb2NrZXQsIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgc3VwZXIodGl0bGUsIHNvY2tldClcclxuICAgIHRoaXMudmFsdWUgPSBkZWZhdWx0VmFsdWVcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT3V0cHV0XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIElucHV0OiByZXF1aXJlKCcuL0lucHV0JyksXHJcbiAgT3V0cHV0OiByZXF1aXJlKCcuL091dHB1dCcpLFxyXG4gIENvbXBvbmVudDogcmVxdWlyZSgnLi9Db21wb25lbnQnKSxcclxuICBOb2RlOiByZXF1aXJlKCcuL05vZGUnKVxyXG59XHJcbiJdfQ==
