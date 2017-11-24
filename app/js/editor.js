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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxmYWtlX2JjZWY3NTA1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFDdEIsdUNBQXVDO0FBQ3ZDLDJDQUEyQzs7QUFFM0Msa0NBQWtDO0FBQ2xDLDBCQUEwQjtBQUMxQix3Q0FBd0M7O0FBRXhDLDREQUE0RDtBQUM1RCw2Q0FBNkM7QUFDN0MsZ0ZBQWdGO0FBQ2hGLGtDQUFrQztBQUNsQyw2Q0FBNkM7QUFDN0MsaUNBQWlDO0FBQ2pDLGdEQUFnRDs7QUFFaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWxFLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUUvRCxnQkFBZ0I7QUFDaEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFO0dBQ3ZELE9BQU8sT0FBTztNQUNYLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDN0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QjtTQUN4RCxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUs7QUFDcEIsWUFBWSxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBRWxDLFNBQVMsR0FBRyxHQUFHO2VBQ1osQ0FBQyxDQUFD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RUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVFO0FBQ0YsNkJBQTZCOztBQUU3QixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFCLENBQUMsQ0FBQztBQUNIO0VBQ0U7QUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zb2xlLmxvZyhcIldURiEgWU9cIilcclxuLy92YXIgRDNORSA9IHJlcXVpcmUoXCJkMy1ub2RlLWVkaXRvclwiKTtcclxuLy92YXIgYWxpZ2h0ID0gcmVxdWlyZShcIi4vaW5jbHVkZXMvYWxpZ2h0XCIpXHJcblxyXG4vL3ZhciBhbGlnaHQgPSBuUmVxdWlyZShcImFsaWdodFwiKTtcclxuLy92YXIgZDMgPSBuUmVxdWlyZShcImQzXCIpO1xyXG4vL3ZhciBEM05FID0gblJlcXVpcmUoXCJkMy1ub2RlLWVkaXRvclwiKTtcclxuXHJcbi8vaW1wb3J0ICogYXMgYWxpZ2h0IGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9hbGlnaHQvYWxpZ2h0J1xyXG4vL2ltcG9ydCAqIGFzIGQzIGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9kMydcclxuLy9pbXBvcnQgKiBhcyBEM05FIGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9kMy1ub2RlLWVkaXRvci9idWlsZC9kMy1ub2RlLWVkaXRvcidcclxuLy9pbXBvcnQgKiBhcyBhbGlnaHQgZnJvbSAnYWxpZ2h0J1xyXG4vL3dpbmRvdy5hbGlnaHQgPSBhbGlnaHQgPSByZXF1aXJlKCdhbGlnaHQnKTtcclxuLy93aW5kb3cuZDMgPSBkMyA9IHJlcXVpcmUoJ2QzJyk7XHJcbi8vd2luZG93LkQzTkUgPSBEM05FID0gcmVxdWlyZSgnZDMtbm9kZS1lZGl0b3InKVxyXG5cclxudmFyIG51bVNvY2tldCA9IG5ldyBEM05FLlNvY2tldChcIm51bWJlclwiLCBcIjggQml0IFNvY2tldFwiLCBcImhpbnRcIik7XHJcblxyXG52YXIgYml0U29ja2V0ID0gbmV3IEQzTkUuU29ja2V0KFwiYml0XCIsIFwiMSBCaXQgU29ja2V0XCIsIFwiaGludFwiKTtcclxuXHJcbi8vQml0IFVzZXJPdXRwdXRcclxudmFyIGNvbXBvbmVudEJpdCA9IG5ldyBEM05FLkNvbXBvbmVudChcIkJpdCAoVXNlciBJbnB1dClcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIG91dDEgPSBuZXcgRDNORS5PdXRwdXQoXCJCaXRcIiwgYml0U29ja2V0KTtcclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLmNoZWNrZWQgPSBjLmdldERhdGEoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZCgpIHtcclxuICAgICAgICAgICAgICAgYy5wdXREYXRhKFwiY2hlY2tlZFwiLCBlbC5jaGVja2VkKTtcclxuICAgICAgICAgICAgICAgZWRpdG9yLmV2ZW50TGlzdGVuZXIudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGQpO1xyXG4gICAgICAgICAgICAvL2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSl7ZS5zdG9wUHJvcGFnYXRpb24oKX0pOy8vIHByZXZlbnQgbm9kZSBtb3ZlbWVudCB3aGVuIHNlbGVjdGluZyB0ZXh0IGluIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgICAgIHVwZCgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4gbm9kZS5hZGRDb250cm9sKG51bUNvbnRyb2wpLmFkZE91dHB1dChvdXQxKTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICBvdXRwdXRzWzBdID0gbm9kZS5kYXRhLmNoZWNrZWQ7XHJcbiAgIH1cclxufSk7XHJcblxyXG4vL0FORCBHYXRlXHJcbnZhciBjb21wb25lbnRBbmQgPSBuZXcgRDNORS5Db21wb25lbnQoXCJBTkRcIiwge1xyXG4gICBidWlsZGVyKG5vZGUpIHtcclxuICAgICAgdmFyIGlucDEgPSBuZXcgRDNORS5JbnB1dChcIkFcIiwgYml0U29ja2V0KTtcclxuICAgICAgdmFyIGlucDIgPSBuZXcgRDNORS5JbnB1dChcIkJcIiwgYml0U29ja2V0KTtcclxuICAgICAgdmFyIG91dCA9IG5ldyBEM05FLk91dHB1dChcIk91dFwiLCBiaXRTb2NrZXQpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKFxyXG4gICAgICAgICAnPGlucHV0IHJlYWRvbmx5IHR5cGU9XCJjaGVja2JveFwiPicsXHJcbiAgICAgICAgIChlbCwgY29udHJvbCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sLnNldFZhbHVlID0gdmFsID0+IHtcclxuICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICAgLmFkZElucHV0KGlucDEpXHJcbiAgICAgICAgIC5hZGRJbnB1dChpbnAyKVxyXG4gICAgICAgICAuYWRkQ29udHJvbChudW1Db250cm9sKVxyXG4gICAgICAgICAuYWRkT3V0cHV0KG91dCk7XHJcbiAgIH0sXHJcbiAgIHdvcmtlcihub2RlLCBpbnB1dHMsIG91dHB1dHMpIHtcclxuICAgICAgdmFyIG91dCA9IGlucHV0c1swXVswXSAmJiBpbnB1dHNbMV1bMF07XHJcbiAgICAgIGVkaXRvci5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PSBub2RlLmlkKS5jb250cm9sc1swXS5zZXRWYWx1ZShvdXQpO1xyXG4gICAgICBvdXRwdXRzWzBdID0gb3V0O1xyXG4gICB9XHJcbn0pO1xyXG4vL09SIEdhdGVcclxuLy9OT1QgR2F0ZVxyXG4vL05BTkQgR2F0ZVxyXG4vL05PUiBHYXRlXHJcbi8vWE9SIEdhdGVcclxuLy9YTk9SIEdhdGVcclxuXHJcblxyXG5cclxudmFyIGNvbXBvbmVudE51bSA9IG5ldyBEM05FLkNvbXBvbmVudChcIk51bWJlclwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woJzxpbnB1dCB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnZhbHVlID0gYy5nZXREYXRhKCdudW0nKSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkKCkge1xyXG4gICAgICAgICAgICAgICBjLnB1dERhdGEoXCJudW1cIiwgcGFyc2VGbG9hdChlbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICBlZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkKTtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlLmFkZENvbnRyb2wobnVtQ29udHJvbCkuYWRkT3V0cHV0KG91dDEpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEubnVtO1xyXG4gICB9XHJcbn0pO1xyXG5cclxudmFyIGNvbXBvbmVudEFkZCA9IG5ldyBEM05FLkNvbXBvbmVudChcIkFkZFwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgaW5wMSA9IG5ldyBEM05FLklucHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IEQzTkUuSW5wdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuICAgICAgdmFyIG91dCA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKFxyXG4gICAgICAgICAnPGlucHV0IHJlYWRvbmx5IHR5cGU9XCJudW1iZXJcIj4nLFxyXG4gICAgICAgICAoZWwsIGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSA9IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgfVxyXG59KTtcclxuXHJcbnZhciBtZW51ID0gbmV3IEQzTkUuQ29udGV4dE1lbnUoe1xyXG4gIFVzZXJJbnB1dDoge1xyXG4gICAgQml0OmNvbXBvbmVudEJpdFxyXG4gIH0sXHJcbiAgQmFzaWNfR2F0ZXM6IHtcclxuICAgIEFORF9HYXRlOmNvbXBvbmVudEFuZFxyXG4gIH0sXHJcbiAgVmFsdWVzOiB7XHJcbiAgICBWYWx1ZTogY29tcG9uZW50TnVtLFxyXG4gICAgQWN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgYWxlcnQoXCJva1wiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIEFkZDogY29tcG9uZW50QWRkXHJcbn0pO1xyXG5cclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9kZUVkaXRvclwiKTtcclxudmFyIGNvbXBvbmVudHMgPSBbY29tcG9uZW50Qml0LCBjb21wb25lbnRBbmQsIGNvbXBvbmVudE51bSwgY29tcG9uZW50QWRkXTtcclxudmFyIGVkaXRvciA9IG5ldyBEM05FLk5vZGVFZGl0b3IoXCJkZW1vQDAuMS4wXCIsIGNvbnRhaW5lciwgY29tcG9uZW50cywgbWVudSk7XHJcbi8qXHJcbnZhciBubiA9IGNvbXBvbmVudE51bS5uZXdOb2RlKCk7XHJcbm5uLmRhdGEubnVtID0gMjtcclxudmFyIG4xID0gY29tcG9uZW50TnVtLmJ1aWxkZXIobm4pO1xyXG52YXIgbjIgPSBjb21wb25lbnROdW0uYnVpbGRlcihjb21wb25lbnROdW0ubmV3Tm9kZSgpKTtcclxudmFyIGFkZCA9IGNvbXBvbmVudEFkZC5idWlsZGVyKGNvbXBvbmVudEFkZC5uZXdOb2RlKCkpO1xyXG5cclxubjEucG9zaXRpb24gPSBbODAsIDIwMF07XHJcbm4yLnBvc2l0aW9uID0gWzgwLCA0MDBdO1xyXG5hZGQucG9zaXRpb24gPSBbNTAwLCAyNDBdO1xyXG5cclxuZWRpdG9yLmNvbm5lY3QobjEub3V0cHV0c1swXSwgYWRkLmlucHV0c1swXSk7XHJcbmVkaXRvci5jb25uZWN0KG4yLm91dHB1dHNbMF0sIGFkZC5pbnB1dHNbMV0pO1xyXG5cclxuZWRpdG9yLmFkZE5vZGUobjEpO1xyXG5lZGl0b3IuYWRkTm9kZShuMik7XHJcbmVkaXRvci5hZGROb2RlKGFkZCk7XHJcbiovXHJcbi8vICBlZGl0b3Iuc2VsZWN0Tm9kZSh0bm9kZSk7XHJcblxyXG52YXIgZW5naW5lID0gbmV3IEQzTkUuRW5naW5lKFwiZGVtb0AwLjEuMFwiLCBjb21wb25lbnRzKTtcclxuZWRpdG9yLmV2ZW50TGlzdGVuZXIub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgIGVuZ2luZS5wcm9jZXNzKDEsbnVsbCk7IC8vIGltYWdpbmUgdGhhdCBpdCBjb3VsZCB0YWtlIG9uZSBzZWNvbmQgb2YgdGltZVxyXG59KTtcclxuLypcclxuKi9cclxuZWRpdG9yLnZpZXcuem9vbUF0KGVkaXRvci5ub2Rlcyk7XHJcbmVkaXRvci5ldmVudExpc3RlbmVyLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbmVkaXRvci52aWV3LnJlc2l6ZSgpO1xyXG4iXX0=