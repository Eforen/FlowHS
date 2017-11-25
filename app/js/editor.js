(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("Bit (User Input)", {
   builder(node) {
      var out1 = new MyEditor.Output("Bit", Socket.Bit);
      var numControl = new MyEditor.Control('<input class="bit" type="checkbox">',
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


},{"../../includes/MyEditor":19,"../Sockets":11}],2:[function(require,module,exports){
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
      var out = new MyEditor.Output("Out", Socket.Bit, false);

      var numControl = new MyEditor.Control(
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


},{"../../includes/MyEditor":19,"../Sockets":11}],4:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("NAND (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit, true);

      var numControl = new MyEditor.Control(
         '<input class="bit" type="checkbox" onclick="return false;" checked>',
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
      var out = !(self.inputs[0].getValue() && self.inputs[1].getValue());
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":19,"../Sockets":11}],5:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("NOR (Built-In)", {
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
      var out = !(self.inputs[0].getValue() || self.inputs[1].getValue());
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":19,"../Sockets":11}],6:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("NOT (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("In", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit, true);

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
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":19,"../Sockets":11}],7:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("OR (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit, false);

      var numControl = new MyEditor.Control(
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


},{"../../includes/MyEditor":19,"../Sockets":11}],8:[function(require,module,exports){
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


},{"../../includes/MyEditor":19,"../Sockets":11}],9:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')
var Socket = require('../Sockets')

module.exports = new MyEditor.Component("XOR (Built-In)", {
   builder(node) {
      var inp1 = new MyEditor.Input("A", Socket.Bit, false);
      var inp2 = new MyEditor.Input("B", Socket.Bit, false);
      var out = new MyEditor.Output("Out", Socket.Bit, false);

      var numControl = new MyEditor.Control(
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
      var out = self.inputs[0].getValue() != self.inputs[1].getValue();
      self.controls[0].setValue(out)
      if(self.outputs[0].value == out) return false; //Was unchanged tell procUpdate to stop propagation of update
      self.outputs[0].value = out;
      return true; //Was Changed so return true
   }
});


},{"../../includes/MyEditor":19,"../Sockets":11}],10:[function(require,module,exports){
var ex = {
  AND: require('./AND'),
  //OR Gate
  OR: require('./OR'),
  //NOT Gate
  NOT: require('./NOT'),
  //NAND Gate
  NAND: require('./NAND'),
  //NOR Gate
  NOR: require('./NOR'),
  //XOR Gate
  XOR: require('./XOR'),
  //XNOR Gate
  XNOR: require('./XNOR')
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


},{"./AND":3,"./NAND":4,"./NOR":5,"./NOT":6,"./OR":7,"./XNOR":8,"./XOR":9}],11:[function(require,module,exports){
const MyEditor = require('../../includes/MyEditor')

module.exports = {
  Bus: new D3NE.Socket("bus", "n Bit Bus Socket", "hint"),
  Bit: new D3NE.Socket("bit", "1 Bit Socket", "hint")
}


},{"../../includes/MyEditor":19}],12:[function(require,module,exports){
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


},{"./Input":2,"./Logic":10,"./Sockets":11}],13:[function(require,module,exports){
var fs = eRequire('fs')

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
window.nodeeditor = editor = new D3NE.NodeEditor("demo@0.1.0", container, components, menu);
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

window.getSaveData = ()=>{
  return JSON.stringify(editor.toJSON())
}


let saveFileLocation = eRequire('path').resolve(dirName, '..', 'data', 'saves', 'BasicGateTest.fhsc');
var saveData = JSON.parse(fs.readFileSync(saveFileLocation));
editor.fromJSON(saveData)

/*
*/
editor.view.zoomAt(editor.nodes);
//editor.eventListener.trigger("change");
editor.view.resize();


},{"./BuiltInChips":12,"./includes/MyEditor":19}],14:[function(require,module,exports){
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


},{"./Node":17}],15:[function(require,module,exports){
class Control extends D3NE.Control {
  constructor(html, handler, setValue) {
    super(html, handler)
    if(setValue) this.setValue = setValue
    else this.setValue = () => { }
  }
}

module.exports = Control


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
class Node extends D3NE.Node {
  constructor(title, logic) {
    super(title)
    this.logic = logic
  }

  procLogic() {
    //if changed update logic down this branch to its output connections
    if(this.logic != null && this.logic(this))
      for (var o = 0; o < this.outputs.length; o++) {
        for (var c = 0; c < this.outputs[o].connections.length; c++) {
          this.outputs[o].connections[c].input.node.procLogic() //Is connected chain down logic update
        }
      }
  }
}

module.exports = Node


},{}],18:[function(require,module,exports){
class Output extends D3NE.Output {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.value = defaultValue
  }
}

module.exports = Output


},{}],19:[function(require,module,exports){
module.exports = {
  Input: require('./Input'),
  Output: require('./Output'),
  Component: require('./Component'),
  Node: require('./Node'),
  Control: require('./Control')
}


},{"./Component":14,"./Control":15,"./Input":16,"./Node":17,"./Output":18}]},{},[13])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXElucHV0XFxCaXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxJbnB1dFxcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxMb2dpY1xcQU5ELmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcTG9naWNcXE5BTkQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcQnVpbHRJbkNoaXBzXFxMb2dpY1xcTk9SLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcTG9naWNcXE5PVC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXExvZ2ljXFxPUi5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXExvZ2ljXFxYTk9SLmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcTG9naWNcXFhPUi5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXExvZ2ljXFxpbmRleC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxCdWlsdEluQ2hpcHNcXFNvY2tldHNcXGluZGV4LmpzIiwiQzpcXGRldlxcSGFyZHdhcmVTaW11bGF0b3JcXEZsb3dIU1xccHJvY2Vzc1xcanNcXEJ1aWx0SW5DaGlwc1xcaW5kZXguanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcZmFrZV9iYmUwYWJjNS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXENvbXBvbmVudC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXENvbnRyb2wuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcaW5jbHVkZXNcXE15RWRpdG9yXFxJbnB1dC5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxpbmNsdWRlc1xcTXlFZGl0b3JcXE5vZGUuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcaW5jbHVkZXNcXE15RWRpdG9yXFxPdXRwdXQuanMiLCJDOlxcZGV2XFxIYXJkd2FyZVNpbXVsYXRvclxcRmxvd0hTXFxwcm9jZXNzXFxqc1xcaW5jbHVkZXNcXE15RWRpdG9yXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztBQUNuRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDOztBQUVsQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtHQUN6RCxPQUFPLE9BQU87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O0VBQy9CLFdBQVcsOEJBQThCO0lBQ3ZDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWTtHQUMxQjtBQUNILENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOzs7O0FDUHZCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7RUFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQztFQUN6QixNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQztFQUMzQixTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztFQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQztDQUM5QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiQml0IChVc2VyIElucHV0KVwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBNeUVkaXRvci5PdXRwdXQoXCJCaXRcIiwgU29ja2V0LkJpdCk7XHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IE15RWRpdG9yLkNvbnRyb2woJzxpbnB1dCBjbGFzcz1cImJpdFwiIHR5cGU9XCJjaGVja2JveFwiPicsXHJcbiAgICAgICAgIChlbCwgYykgPT4ge1xyXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gYy5nZXREYXRhKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGQoKSB7XHJcbiAgICAgICAgICAgICAgaWYob3V0MS52YWx1ZSAhPSBlbC5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICBvdXQxLnZhbHVlID0gZWwuY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICBub2RlLnByb2NMb2dpYygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgLy9lZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZCk7XHJcbiAgICAgICAgICAgIC8vZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hbGxub2Rlc1t3aW5kb3cuYWxsbm9kZXMubGVuZ3RoXSA9IG5vZGVcclxuICAgICAgbm9kZS53b3JrZXIgPSAobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSA9PiB7XHJcbiAgICAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEuY2hlY2tlZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZS5hZGRDb250cm9sKG51bUNvbnRyb2wpLmFkZE91dHB1dChvdXQxKTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICBub2RlLndvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpXHJcbiAgIH0sXHJcbiAgIGxvZ2ljKHNlbGYpIHtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcyBpcyBhIHNvdXJjZSBzbyB3aGVuIGV2ZXIgaXQgYXNrcyBpZiBpdCBzaG91bGQgcHJvY1xyXG4gICB9XHJcbn0pO1xyXG4iLCJ2YXIgZXggPSB7XHJcbiAgQml0OiByZXF1aXJlKCcuL0JpdCcpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXhcclxuIiwiY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuLi8uLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuLi9Tb2NrZXRzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IE15RWRpdG9yLkNvbXBvbmVudChcIkFORCAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIGZhbHNlKTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IE15RWRpdG9yLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIG5vZGUubXl3b3JrZXIgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICB2YXIgb3V0ID0gaW5wdXRzWzBdWzBdICYmIGlucHV0c1sxXVswXTtcclxuICAgICAgICAgZWRpdG9yLm5vZGVzLmZpbmQobiA9PiBuLmlkID09IG5vZGUuaWQpLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dCk7XHJcbiAgICAgICAgIG91dHB1dHNbMF0gPSBvdXQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgbm9kZS53b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKVxyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHZhciBvdXQgPSBzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpICYmIHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCk7XHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiTkFORCAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIHRydWUpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgTXlFZGl0b3IuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImJpdFwiIHR5cGU9XCJjaGVja2JveFwiIG9uY2xpY2s9XCJyZXR1cm4gZmFsc2U7XCIgY2hlY2tlZD4nLFxyXG4gICAgICAgICAoZWwsIGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSA9IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmFsbG5vZGVzW3dpbmRvdy5hbGxub2Rlcy5sZW5ndGhdID0gbm9kZVxyXG4gICAgICBub2RlLm15d29ya2VyID0gKG5vZGUpID0+IHtcclxuICAgICAgICAgdmFyIG91dCA9IGlucHV0c1swXVswXSAmJiBpbnB1dHNbMV1bMF07XHJcbiAgICAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShvdXQpO1xyXG4gICAgICAgICBvdXRwdXRzWzBdID0gb3V0O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAxKVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMilcclxuICAgICAgICAgLmFkZENvbnRyb2wobnVtQ29udHJvbClcclxuICAgICAgICAgLmFkZE91dHB1dChvdXQpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG5vZGUud29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cylcclxuICAgfSxcclxuICAgbG9naWMoc2VsZikge1xyXG4gICAgICB2YXIgb3V0ID0gIShzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpICYmIHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCkpO1xyXG4gICAgICBzZWxmLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dClcclxuICAgICAgaWYoc2VsZi5vdXRwdXRzWzBdLnZhbHVlID09IG91dCkgcmV0dXJuIGZhbHNlOyAvL1dhcyB1bmNoYW5nZWQgdGVsbCBwcm9jVXBkYXRlIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdXBkYXRlXHJcbiAgICAgIHNlbGYub3V0cHV0c1swXS52YWx1ZSA9IG91dDtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vV2FzIENoYW5nZWQgc28gcmV0dXJuIHRydWVcclxuICAgfVxyXG59KTtcclxuIiwiY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuLi8uLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuLi9Tb2NrZXRzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IE15RWRpdG9yLkNvbXBvbmVudChcIk5PUiAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIHRydWUpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgTXlFZGl0b3IuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCAgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiIGNoZWNrZWQ+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHdpbmRvdy5hbGxub2Rlc1t3aW5kb3cuYWxsbm9kZXMubGVuZ3RoXSA9IG5vZGVcclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgfSxcclxuICAgbG9naWMoc2VsZikge1xyXG4gICAgICB2YXIgb3V0ID0gIShzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpIHx8IHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCkpO1xyXG4gICAgICBzZWxmLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dClcclxuICAgICAgaWYoc2VsZi5vdXRwdXRzWzBdLnZhbHVlID09IG91dCkgcmV0dXJuIGZhbHNlOyAvL1dhcyB1bmNoYW5nZWQgdGVsbCBwcm9jVXBkYXRlIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdXBkYXRlXHJcbiAgICAgIHNlbGYub3V0cHV0c1swXS52YWx1ZSA9IG91dDtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vV2FzIENoYW5nZWQgc28gcmV0dXJuIHRydWVcclxuICAgfVxyXG59KTtcclxuIiwiY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuLi8uLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuLi9Tb2NrZXRzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IE15RWRpdG9yLkNvbXBvbmVudChcIk5PVCAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiSW5cIiwgU29ja2V0LkJpdCwgZmFsc2UpO1xyXG4gICAgICB2YXIgb3V0ID0gbmV3IE15RWRpdG9yLk91dHB1dChcIk91dFwiLCBTb2NrZXQuQml0LCB0cnVlKTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IE15RWRpdG9yLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiIGNoZWNrZWQ+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIC8vU2V0IHRvIHRydWUgYmUgY2F1c2Ugc3RhcnRpbmcgb3V0IGlucHV0IGRlZmF1bHRzIHRvIGZhbHNlIHRodXMgTk9UIGZhbHNlIGlzIHRoZSBzdGF0ZSB3aXRob3V0IGFueSBjb25uZWN0aW9uc1xyXG4gICAgICB3aW5kb3cuYWxsbm9kZXNbd2luZG93LmFsbG5vZGVzLmxlbmd0aF0gPSBub2RlXHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAxKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgfSxcclxuICAgbG9naWMoc2VsZikge1xyXG4gICAgICB2YXIgb3V0ID0gIXNlbGYuaW5wdXRzWzBdLmdldFZhbHVlKClcclxuICAgICAgc2VsZi5jb250cm9sc1swXS5zZXRWYWx1ZShvdXQpXHJcbiAgICAgIGlmKHNlbGYub3V0cHV0c1swXS52YWx1ZSA9PSBvdXQpIHJldHVybiBmYWxzZTsgLy9XYXMgdW5jaGFuZ2VkIHRlbGwgcHJvY1VwZGF0ZSB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHVwZGF0ZVxyXG4gICAgICBzZWxmLm91dHB1dHNbMF0udmFsdWUgPSBvdXQ7XHJcbiAgICAgIHJldHVybiB0cnVlOyAvL1dhcyBDaGFuZ2VkIHNvIHJldHVybiB0cnVlXHJcbiAgIH1cclxufSk7XHJcbiIsImNvbnN0IE15RWRpdG9yID0gcmVxdWlyZSgnLi4vLi4vaW5jbHVkZXMvTXlFZGl0b3InKVxyXG52YXIgU29ja2V0ID0gcmVxdWlyZSgnLi4vU29ja2V0cycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBNeUVkaXRvci5Db21wb25lbnQoXCJPUiAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIGZhbHNlKTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IE15RWRpdG9yLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgIGNsYXNzPVwiYml0XCIgdHlwZT1cImNoZWNrYm94XCIgb25jbGljaz1cInJldHVybiBmYWxzZTtcIj4nLFxyXG4gICAgICAgICAoZWwsIGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSA9IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmFsbG5vZGVzW3dpbmRvdy5hbGxub2Rlcy5sZW5ndGhdID0gbm9kZVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHZhciBvdXQgPSBzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpIHx8IHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCk7XHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4uL1NvY2tldHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlFZGl0b3IuQ29tcG9uZW50KFwiWE5PUiAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIHRydWUpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgTXlFZGl0b3IuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCAgY2xhc3M9XCJiaXRcIiB0eXBlPVwiY2hlY2tib3hcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiIGNoZWNrZWQ+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHdpbmRvdy5hbGxub2Rlc1t3aW5kb3cuYWxsbm9kZXMubGVuZ3RoXSA9IG5vZGVcclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgfSxcclxuICAgbG9naWMoc2VsZikge1xyXG4gICAgICB2YXIgb3V0ID0gc2VsZi5pbnB1dHNbMF0uZ2V0VmFsdWUoKSA9PSBzZWxmLmlucHV0c1sxXS5nZXRWYWx1ZSgpO1xyXG4gICAgICBzZWxmLmNvbnRyb2xzWzBdLnNldFZhbHVlKG91dClcclxuICAgICAgaWYoc2VsZi5vdXRwdXRzWzBdLnZhbHVlID09IG91dCkgcmV0dXJuIGZhbHNlOyAvL1dhcyB1bmNoYW5nZWQgdGVsbCBwcm9jVXBkYXRlIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdXBkYXRlXHJcbiAgICAgIHNlbGYub3V0cHV0c1swXS52YWx1ZSA9IG91dDtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vV2FzIENoYW5nZWQgc28gcmV0dXJuIHRydWVcclxuICAgfVxyXG59KTtcclxuIiwiY29uc3QgTXlFZGl0b3IgPSByZXF1aXJlKCcuLi8uLi9pbmNsdWRlcy9NeUVkaXRvcicpXHJcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuLi9Tb2NrZXRzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IE15RWRpdG9yLkNvbXBvbmVudChcIlhPUiAoQnVpbHQtSW4pXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBpbnAxID0gbmV3IE15RWRpdG9yLklucHV0KFwiQVwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IE15RWRpdG9yLklucHV0KFwiQlwiLCBTb2NrZXQuQml0LCBmYWxzZSk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgTXlFZGl0b3IuT3V0cHV0KFwiT3V0XCIsIFNvY2tldC5CaXQsIGZhbHNlKTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IE15RWRpdG9yLkNvbnRyb2woXHJcbiAgICAgICAgICc8aW5wdXQgIGNsYXNzPVwiYml0XCIgdHlwZT1cImNoZWNrYm94XCIgb25jbGljaz1cInJldHVybiBmYWxzZTtcIj4nLFxyXG4gICAgICAgICAoZWwsIGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSA9IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgIGVsLmNoZWNrZWQgPSB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmFsbG5vZGVzW3dpbmRvdy5hbGxub2Rlcy5sZW5ndGhdID0gbm9kZVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICB9LFxyXG4gICBsb2dpYyhzZWxmKSB7XHJcbiAgICAgIHZhciBvdXQgPSBzZWxmLmlucHV0c1swXS5nZXRWYWx1ZSgpICE9IHNlbGYuaW5wdXRzWzFdLmdldFZhbHVlKCk7XHJcbiAgICAgIHNlbGYuY29udHJvbHNbMF0uc2V0VmFsdWUob3V0KVxyXG4gICAgICBpZihzZWxmLm91dHB1dHNbMF0udmFsdWUgPT0gb3V0KSByZXR1cm4gZmFsc2U7IC8vV2FzIHVuY2hhbmdlZCB0ZWxsIHByb2NVcGRhdGUgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB1cGRhdGVcclxuICAgICAgc2VsZi5vdXRwdXRzWzBdLnZhbHVlID0gb3V0O1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy9XYXMgQ2hhbmdlZCBzbyByZXR1cm4gdHJ1ZVxyXG4gICB9XHJcbn0pO1xyXG4iLCJ2YXIgZXggPSB7XHJcbiAgQU5EOiByZXF1aXJlKCcuL0FORCcpLFxyXG4gIC8vT1IgR2F0ZVxyXG4gIE9SOiByZXF1aXJlKCcuL09SJyksXHJcbiAgLy9OT1QgR2F0ZVxyXG4gIE5PVDogcmVxdWlyZSgnLi9OT1QnKSxcclxuICAvL05BTkQgR2F0ZVxyXG4gIE5BTkQ6IHJlcXVpcmUoJy4vTkFORCcpLFxyXG4gIC8vTk9SIEdhdGVcclxuICBOT1I6IHJlcXVpcmUoJy4vTk9SJyksXHJcbiAgLy9YT1IgR2F0ZVxyXG4gIFhPUjogcmVxdWlyZSgnLi9YT1InKSxcclxuICAvL1hOT1IgR2F0ZVxyXG4gIFhOT1I6IHJlcXVpcmUoJy4vWE5PUicpXHJcbiAgLy9hbGw6IFtdXHJcbn1cclxuXHJcbi8vZXguYWxsLnB1c2goZXguQU5EKVxyXG4vL2V4LmFsbC5wdXNoKGV4Lk9SKVxyXG4vL2V4LmFsbC5wdXNoKGV4Lk5PVClcclxuLy9leC5hbGwucHVzaChleC5OQU5EKVxyXG4vL2V4LmFsbC5wdXNoKGV4Lk5PUilcclxuLy9leC5hbGwucHVzaChleC5YT1IpXHJcbi8vZXguYWxsLnB1c2goZXguWE5PUilcclxubW9kdWxlLmV4cG9ydHMgPSBleFxyXG4iLCJjb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4uLy4uL2luY2x1ZGVzL015RWRpdG9yJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIEJ1czogbmV3IEQzTkUuU29ja2V0KFwiYnVzXCIsIFwibiBCaXQgQnVzIFNvY2tldFwiLCBcImhpbnRcIiksXHJcbiAgQml0OiBuZXcgRDNORS5Tb2NrZXQoXCJiaXRcIiwgXCIxIEJpdCBTb2NrZXRcIiwgXCJoaW50XCIpXHJcbn1cclxuIiwidmFyIGV4ID0ge1xyXG4gIElucHV0OiByZXF1aXJlKCcuL0lucHV0JyksXHJcbiAgTG9naWM6IHJlcXVpcmUoJy4vTG9naWMnKSxcclxuICBTb2NrZXQ6IHJlcXVpcmUoJy4vU29ja2V0cycpLFxyXG4gIEFsbENvbXBvbmVudHM6IFtdXHJcbn1cclxuXHJcbnZhciBhZGRDb21wcyA9IChjb21wcykgPT4ge1xyXG4gIGZvciAodmFyIGtleSBpbiBjb21wcykge1xyXG4gICAgZXguQWxsQ29tcG9uZW50cy5wdXNoKGNvbXBzW2tleV0pXHJcbiAgfVxyXG59XHJcblxyXG5hZGRDb21wcyhleC5JbnB1dClcclxuYWRkQ29tcHMoZXguTG9naWMpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4XHJcbiIsInZhciBmcyA9IGVSZXF1aXJlKCdmcycpXHJcblxyXG4vL3ZhciBEM05FID0gcmVxdWlyZShcImQzLW5vZGUtZWRpdG9yXCIpO1xyXG4vL3ZhciBhbGlnaHQgPSByZXF1aXJlKFwiLi9pbmNsdWRlcy9hbGlnaHRcIilcclxuXHJcbi8vdmFyIGFsaWdodCA9IG5SZXF1aXJlKFwiYWxpZ2h0XCIpO1xyXG4vL3ZhciBkMyA9IG5SZXF1aXJlKFwiZDNcIik7XHJcbi8vdmFyIEQzTkUgPSBuUmVxdWlyZShcImQzLW5vZGUtZWRpdG9yXCIpO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBhbGlnaHQgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2FsaWdodC9hbGlnaHQnXHJcbi8vaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2QzJ1xyXG4vL2ltcG9ydCAqIGFzIEQzTkUgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL2QzLW5vZGUtZWRpdG9yL2J1aWxkL2QzLW5vZGUtZWRpdG9yJ1xyXG4vL2ltcG9ydCAqIGFzIGFsaWdodCBmcm9tICdhbGlnaHQnXHJcbi8vd2luZG93LmFsaWdodCA9IGFsaWdodCA9IHJlcXVpcmUoJ2FsaWdodCcpO1xyXG4vL3dpbmRvdy5kMyA9IGQzID0gcmVxdWlyZSgnZDMnKTtcclxuLy93aW5kb3cuRDNORSA9IEQzTkUgPSByZXF1aXJlKCdkMy1ub2RlLWVkaXRvcicpXHJcblxyXG5jb25zdCBNeUVkaXRvciA9IHJlcXVpcmUoJy4vaW5jbHVkZXMvTXlFZGl0b3InKVxyXG5jb25zdCBCdWlsZEluID0gcmVxdWlyZSgnLi9CdWlsdEluQ2hpcHMnKVxyXG53aW5kb3cuQnVpbGRJbiA9IEJ1aWxkSW5cclxuXHJcbndpbmRvdy5wcm9jTm9kZSA9IChub2RlKSA9PiB7XHJcbiAgaWYobm9kZS5pbnB1dHMubGVuZ3RoID4gMCl7XHJcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGUuaW5wdXRzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgIGlmKG5vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL25vZGUuaW5wdXRzW25dLmNvbm5lY3Rpb25zWzBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5hbGxub2RlcyA9IFtdXHJcbi8vQml0IFVzZXJPdXRwdXRcclxuXHJcbi8vQU5EIEdhdGVcclxuLy9PUiBHYXRlXHJcbi8vTk9UIEdhdGVcclxuLy9OQU5EIEdhdGVcclxuLy9OT1IgR2F0ZVxyXG4vL1hPUiBHYXRlXHJcbi8vWE5PUiBHYXRlXHJcblxyXG5cclxuXHJcbi8qXHJcblxyXG52YXIgY29tcG9uZW50TnVtID0gbmV3IEQzTkUuQ29tcG9uZW50KFwiTnVtYmVyXCIsIHtcclxuICAgYnVpbGRlcihub2RlKSB7XHJcbiAgICAgIHZhciBvdXQxID0gbmV3IEQzTkUuT3V0cHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIj4nLFxyXG4gICAgICAgICAoZWwsIGMpID0+IHtcclxuICAgICAgICAgICAgZWwudmFsdWUgPSBjLmdldERhdGEoJ251bScpIHx8IDE7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGQoKSB7XHJcbiAgICAgICAgICAgICAgIGMucHV0RGF0YShcIm51bVwiLCBwYXJzZUZsb2F0KGVsLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgIGVkaXRvci5ldmVudExpc3RlbmVyLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGQpO1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTsvLyBwcmV2ZW50IG5vZGUgbW92ZW1lbnQgd2hlbiBzZWxlY3RpbmcgdGV4dCBpbiB0aGUgaW5wdXQgZmllbGRcclxuICAgICAgICAgICB1cGQoKTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGUuYWRkQ29udHJvbChudW1Db250cm9sKS5hZGRPdXRwdXQob3V0MSk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgb3V0cHV0c1swXSA9IG5vZGUuZGF0YS5udW07XHJcbiAgIH1cclxufSk7XHJcbnZhciBjb21wb25lbnRBZGQgPSBuZXcgRDNORS5Db21wb25lbnQoXCJBZGRcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgRDNORS5JbnB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgaW5wMiA9IG5ldyBEM05FLklucHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBvdXQgPSBuZXcgRDNORS5PdXRwdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuXHJcbiAgICAgIHZhciBudW1Db250cm9sID0gbmV3IEQzTkUuQ29udHJvbChcclxuICAgICAgICAgJzxpbnB1dCByZWFkb25seSB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjb250cm9sKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUgPSB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgbm9kZS53b3JrZXIgPSAobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSA9PiB7XHJcbiAgICAgICAgIHZhciBzdW0gPSBpbnB1dHNbMF1bMF0gKyBpbnB1dHNbMV1bMF07XHJcbiAgICAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShzdW0pO1xyXG4gICAgICAgICBvdXRwdXRzWzBdID0gc3VtO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAxKVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMilcclxuICAgICAgICAgLmFkZENvbnRyb2wobnVtQ29udHJvbClcclxuICAgICAgICAgLmFkZE91dHB1dChvdXQpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIHZhciBzdW0gPSBpbnB1dHNbMF1bMF0gKyBpbnB1dHNbMV1bMF07XHJcbiAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShzdW0pO1xyXG4gICAgICBvdXRwdXRzWzBdID0gc3VtO1xyXG4gICB9XHJcbn0pO1xyXG4qL1xyXG5cclxudmFyIG1lbnUgPSBuZXcgRDNORS5Db250ZXh0TWVudSh7XHJcbiAgVXNlcklucHV0OkJ1aWxkSW4uSW5wdXQsXHJcbiAgQmFzaWNfR2F0ZXM6QnVpbGRJbi5Mb2dpYy8qLFxyXG4gIFZhbHVlczoge1xyXG4gICAgVmFsdWU6IGNvbXBvbmVudE51bSxcclxuICAgIEFjdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGFsZXJ0KFwib2tcIik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBBZGQ6IGNvbXBvbmVudEFkZFxyXG4gICAgKi9cclxufSk7XHJcblxyXG52YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub2RlRWRpdG9yXCIpO1xyXG4vL3ZhciBjb21wb25lbnRzID0gW0J1aWxkSW4uSW5wdXQuQml0LCBCdWlsZEluLkxvZ2ljLkFORF07XHJcbnZhciBjb21wb25lbnRzID0gQnVpbGRJbi5BbGxDb21wb25lbnRzXHJcbndpbmRvdy5ub2RlQ29tcHMgPSBjb21wb25lbnRzXHJcbndpbmRvdy5ub2RlZWRpdG9yID0gZWRpdG9yID0gbmV3IEQzTkUuTm9kZUVkaXRvcihcImRlbW9AMC4xLjBcIiwgY29udGFpbmVyLCBjb21wb25lbnRzLCBtZW51KTtcclxuLypcclxudmFyIG5uID0gY29tcG9uZW50TnVtLm5ld05vZGUoKTtcclxubm4uZGF0YS5udW0gPSAyO1xyXG52YXIgbjEgPSBjb21wb25lbnROdW0uYnVpbGRlcihubik7XHJcbnZhciBuMiA9IGNvbXBvbmVudE51bS5idWlsZGVyKGNvbXBvbmVudE51bS5uZXdOb2RlKCkpO1xyXG52YXIgYWRkID0gY29tcG9uZW50QWRkLmJ1aWxkZXIoY29tcG9uZW50QWRkLm5ld05vZGUoKSk7XHJcblxyXG5uMS5wb3NpdGlvbiA9IFs4MCwgMjAwXTtcclxubjIucG9zaXRpb24gPSBbODAsIDQwMF07XHJcbmFkZC5wb3NpdGlvbiA9IFs1MDAsIDI0MF07XHJcblxyXG5lZGl0b3IuY29ubmVjdChuMS5vdXRwdXRzWzBdLCBhZGQuaW5wdXRzWzBdKTtcclxuZWRpdG9yLmNvbm5lY3QobjIub3V0cHV0c1swXSwgYWRkLmlucHV0c1sxXSk7XHJcblxyXG5lZGl0b3IuYWRkTm9kZShuMSk7XHJcbmVkaXRvci5hZGROb2RlKG4yKTtcclxuZWRpdG9yLmFkZE5vZGUoYWRkKTtcclxuKi9cclxuLy8gIGVkaXRvci5zZWxlY3ROb2RlKHRub2RlKTtcclxuXHJcbnZhciBlbmdpbmUgPSBuZXcgRDNORS5FbmdpbmUoXCJkZW1vQDAuMS4wXCIsIGNvbXBvbmVudHMpO1xyXG5lZGl0b3IuZXZlbnRMaXN0ZW5lci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy9lbmdpbmUucHJvY2VzcyhlZGl0b3IudG9KU09OKCksbnVsbCk7IC8vIGltYWdpbmUgdGhhdCBpdCBjb3VsZCB0YWtlIG9uZSBzZWNvbmQgb2YgdGltZVxyXG59KTtcclxuXHJcbmVkaXRvci5ldmVudExpc3RlbmVyLm9uKCdjb25uZWN0aW9uY3JlYXRlJywgKHBhcmFtKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhwYXJhbSlcclxuICBzZXRUaW1lb3V0KCgpPT57cGFyYW0uaW5wdXQubm9kZS5wcm9jTG9naWMoKX0sIDEwKTtcclxufSk7XHJcbmVkaXRvci5ldmVudExpc3RlbmVyLm9uKCdjb25uZWN0aW9ucmVtb3ZlJywgKHBhcmFtKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhwYXJhbSlcclxuICBzZXRUaW1lb3V0KCgpPT57cGFyYW0uaW5wdXQubm9kZS5wcm9jTG9naWMoKX0sIDEwKTtcclxufSk7XHJcblxyXG53aW5kb3cuZ2V0U2F2ZURhdGEgPSAoKT0+e1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShlZGl0b3IudG9KU09OKCkpXHJcbn1cclxuXHJcblxyXG5sZXQgc2F2ZUZpbGVMb2NhdGlvbiA9IGVSZXF1aXJlKCdwYXRoJykucmVzb2x2ZShkaXJOYW1lLCAnLi4nLCAnZGF0YScsICdzYXZlcycsICdCYXNpY0dhdGVUZXN0LmZoc2MnKTtcclxudmFyIHNhdmVEYXRhID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoc2F2ZUZpbGVMb2NhdGlvbikpO1xyXG5lZGl0b3IuZnJvbUpTT04oc2F2ZURhdGEpXHJcblxyXG4vKlxyXG4qL1xyXG5lZGl0b3Iudmlldy56b29tQXQoZWRpdG9yLm5vZGVzKTtcclxuLy9lZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG5lZGl0b3Iudmlldy5yZXNpemUoKTtcclxuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKVxyXG5cclxuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRDNORS5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBwcm9wcykge1xyXG4gICAgc3VwZXIodGl0bGUsIHByb3BzKVxyXG4gICAgdGhpcy5sb2dpYyA9IHByb3BzLmxvZ2ljXHJcbiAgfVxyXG5cclxuICBuZXdOb2RlKCkge1xyXG4gICAgcmV0dXJuIG5ldyBOb2RlKHRoaXMubmFtZSwgdGhpcy5sb2dpYyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxyXG4iLCJjbGFzcyBDb250cm9sIGV4dGVuZHMgRDNORS5Db250cm9sIHtcclxuICBjb25zdHJ1Y3RvcihodG1sLCBoYW5kbGVyLCBzZXRWYWx1ZSkge1xyXG4gICAgc3VwZXIoaHRtbCwgaGFuZGxlcilcclxuICAgIGlmKHNldFZhbHVlKSB0aGlzLnNldFZhbHVlID0gc2V0VmFsdWVcclxuICAgIGVsc2UgdGhpcy5zZXRWYWx1ZSA9ICgpID0+IHsgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sXHJcbiIsImNsYXNzIElucHV0IGV4dGVuZHMgRDNORS5JbnB1dCB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIHNvY2tldCwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICBzdXBlcih0aXRsZSwgc29ja2V0KVxyXG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWVcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCkge1xyXG4gICAgLy9yZXR1cm4gYWxsbm9kZXNbMV0uaW5wdXRzWzBdLmNvbm5lY3Rpb25zWzBdLm91dHB1dC52YWx1ZVxyXG4gICAgaWYodGhpcy5jb25uZWN0aW9ucy5sZW5ndGggPT0gMCkgcmV0dXJuIHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbnNbMF0ub3V0cHV0LnZhbHVlXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0XHJcbiIsImNsYXNzIE5vZGUgZXh0ZW5kcyBEM05FLk5vZGUge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBsb2dpYykge1xyXG4gICAgc3VwZXIodGl0bGUpXHJcbiAgICB0aGlzLmxvZ2ljID0gbG9naWNcclxuICB9XHJcblxyXG4gIHByb2NMb2dpYygpIHtcclxuICAgIC8vaWYgY2hhbmdlZCB1cGRhdGUgbG9naWMgZG93biB0aGlzIGJyYW5jaCB0byBpdHMgb3V0cHV0IGNvbm5lY3Rpb25zXHJcbiAgICBpZih0aGlzLmxvZ2ljICE9IG51bGwgJiYgdGhpcy5sb2dpYyh0aGlzKSlcclxuICAgICAgZm9yICh2YXIgbyA9IDA7IG8gPCB0aGlzLm91dHB1dHMubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMub3V0cHV0c1tvXS5jb25uZWN0aW9ucy5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgdGhpcy5vdXRwdXRzW29dLmNvbm5lY3Rpb25zW2NdLmlucHV0Lm5vZGUucHJvY0xvZ2ljKCkgLy9JcyBjb25uZWN0ZWQgY2hhaW4gZG93biBsb2dpYyB1cGRhdGVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTm9kZVxyXG4iLCJjbGFzcyBPdXRwdXQgZXh0ZW5kcyBEM05FLk91dHB1dCB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIHNvY2tldCwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICBzdXBlcih0aXRsZSwgc29ja2V0KVxyXG4gICAgdGhpcy52YWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPdXRwdXRcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgSW5wdXQ6IHJlcXVpcmUoJy4vSW5wdXQnKSxcclxuICBPdXRwdXQ6IHJlcXVpcmUoJy4vT3V0cHV0JyksXHJcbiAgQ29tcG9uZW50OiByZXF1aXJlKCcuL0NvbXBvbmVudCcpLFxyXG4gIE5vZGU6IHJlcXVpcmUoJy4vTm9kZScpLFxyXG4gIENvbnRyb2w6IHJlcXVpcmUoJy4vQ29udHJvbCcpXHJcbn1cclxuIl19
