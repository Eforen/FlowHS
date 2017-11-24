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

var numSocket = new D3NE.Socket("number", "Number value", "hint");

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
   Values: {
      Value: componentNum,
      Action: function() {
         alert("ok");
      }
   },
   Add: componentAdd
});

var container = document.getElementById("nodeEditor");
var components = [componentNum, componentAdd];
var editor = new D3NE.NodeEditor("demo@0.1.0", container, components, menu);

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
//  editor.selectNode(tnode);

var engine = new D3NE.Engine("demo@0.1.0", components);
/*
editor.eventListener.on("change", async function() {
   await engine.abort();
   await engine.process(editor.toJSON());
});
*/
editor.view.zoomAt(editor.nodes);
editor.eventListener.trigger("change");
editor.view.resize();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFxkZXZcXEhhcmR3YXJlU2ltdWxhdG9yXFxGbG93SFNcXHByb2Nlc3NcXGpzXFxmYWtlXzljYWYxMWM4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFDdEIsdUNBQXVDO0FBQ3ZDLDJDQUEyQzs7QUFFM0Msa0NBQWtDO0FBQ2xDLDBCQUEwQjtBQUMxQix3Q0FBd0M7O0FBRXhDLDREQUE0RDtBQUM1RCw2Q0FBNkM7QUFDN0MsZ0ZBQWdGO0FBQ2hGLGtDQUFrQztBQUNsQyw2Q0FBNkM7QUFDN0MsaUNBQWlDO0FBQ2pDLGdEQUFnRDs7QUFFaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWxFLElBQUksWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7R0FDN0MsT0FBTyxPQUFPO01BQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUNoRCxJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCO1NBQ3RELENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSztBQUNwQixZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBRWpDLFNBQVMsR0FBRyxHQUFHO2VBQ1osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2VBQ3ZDLE1BQU0sQ0FBQyxhQUFhLENBQUMs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QUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc29sZS5sb2coXCJXVEYhIFlPXCIpXHJcbi8vdmFyIEQzTkUgPSByZXF1aXJlKFwiZDMtbm9kZS1lZGl0b3JcIik7XHJcbi8vdmFyIGFsaWdodCA9IHJlcXVpcmUoXCIuL2luY2x1ZGVzL2FsaWdodFwiKVxyXG5cclxuLy92YXIgYWxpZ2h0ID0gblJlcXVpcmUoXCJhbGlnaHRcIik7XHJcbi8vdmFyIGQzID0gblJlcXVpcmUoXCJkM1wiKTtcclxuLy92YXIgRDNORSA9IG5SZXF1aXJlKFwiZDMtbm9kZS1lZGl0b3JcIik7XHJcblxyXG4vL2ltcG9ydCAqIGFzIGFsaWdodCBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvYWxpZ2h0L2FsaWdodCdcclxuLy9pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvZDMnXHJcbi8vaW1wb3J0ICogYXMgRDNORSBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvZDMtbm9kZS1lZGl0b3IvYnVpbGQvZDMtbm9kZS1lZGl0b3InXHJcbi8vaW1wb3J0ICogYXMgYWxpZ2h0IGZyb20gJ2FsaWdodCdcclxuLy93aW5kb3cuYWxpZ2h0ID0gYWxpZ2h0ID0gcmVxdWlyZSgnYWxpZ2h0Jyk7XHJcbi8vd2luZG93LmQzID0gZDMgPSByZXF1aXJlKCdkMycpO1xyXG4vL3dpbmRvdy5EM05FID0gRDNORSA9IHJlcXVpcmUoJ2QzLW5vZGUtZWRpdG9yJylcclxuXHJcbnZhciBudW1Tb2NrZXQgPSBuZXcgRDNORS5Tb2NrZXQoXCJudW1iZXJcIiwgXCJOdW1iZXIgdmFsdWVcIiwgXCJoaW50XCIpO1xyXG5cclxudmFyIGNvbXBvbmVudE51bSA9IG5ldyBEM05FLkNvbXBvbmVudChcIk51bWJlclwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgb3V0MSA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG4gICAgICB2YXIgbnVtQ29udHJvbCA9IG5ldyBEM05FLkNvbnRyb2woJzxpbnB1dCB0eXBlPVwibnVtYmVyXCI+JyxcclxuICAgICAgICAgKGVsLCBjKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnZhbHVlID0gYy5nZXREYXRhKCdudW0nKSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkKCkge1xyXG4gICAgICAgICAgICAgICBjLnB1dERhdGEoXCJudW1cIiwgcGFyc2VGbG9hdChlbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICBlZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkKTtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpfSk7Ly8gcHJldmVudCBub2RlIG1vdmVtZW50IHdoZW4gc2VsZWN0aW5nIHRleHQgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgdXBkKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBub2RlLmFkZENvbnRyb2wobnVtQ29udHJvbCkuYWRkT3V0cHV0KG91dDEpO1xyXG4gICB9LFxyXG4gICB3b3JrZXIobm9kZSwgaW5wdXRzLCBvdXRwdXRzKSB7XHJcbiAgICAgIG91dHB1dHNbMF0gPSBub2RlLmRhdGEubnVtO1xyXG4gICB9XHJcbn0pO1xyXG5cclxudmFyIGNvbXBvbmVudEFkZCA9IG5ldyBEM05FLkNvbXBvbmVudChcIkFkZFwiLCB7XHJcbiAgIGJ1aWxkZXIobm9kZSkge1xyXG4gICAgICB2YXIgaW5wMSA9IG5ldyBEM05FLklucHV0KFwiTnVtYmVyXCIsIG51bVNvY2tldCk7XHJcbiAgICAgIHZhciBpbnAyID0gbmV3IEQzTkUuSW5wdXQoXCJOdW1iZXJcIiwgbnVtU29ja2V0KTtcclxuICAgICAgdmFyIG91dCA9IG5ldyBEM05FLk91dHB1dChcIk51bWJlclwiLCBudW1Tb2NrZXQpO1xyXG5cclxuICAgICAgdmFyIG51bUNvbnRyb2wgPSBuZXcgRDNORS5Db250cm9sKFxyXG4gICAgICAgICAnPGlucHV0IHJlYWRvbmx5IHR5cGU9XCJudW1iZXJcIj4nLFxyXG4gICAgICAgICAoZWwsIGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSA9IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgICAuYWRkSW5wdXQoaW5wMSlcclxuICAgICAgICAgLmFkZElucHV0KGlucDIpXHJcbiAgICAgICAgIC5hZGRDb250cm9sKG51bUNvbnRyb2wpXHJcbiAgICAgICAgIC5hZGRPdXRwdXQob3V0KTtcclxuICAgfSxcclxuICAgd29ya2VyKG5vZGUsIGlucHV0cywgb3V0cHV0cykge1xyXG4gICAgICB2YXIgc3VtID0gaW5wdXRzWzBdWzBdICsgaW5wdXRzWzFdWzBdO1xyXG4gICAgICBlZGl0b3Iubm9kZXMuZmluZChuID0+IG4uaWQgPT0gbm9kZS5pZCkuY29udHJvbHNbMF0uc2V0VmFsdWUoc3VtKTtcclxuICAgICAgb3V0cHV0c1swXSA9IHN1bTtcclxuICAgfVxyXG59KTtcclxuXHJcbnZhciBtZW51ID0gbmV3IEQzTkUuQ29udGV4dE1lbnUoe1xyXG4gICBWYWx1ZXM6IHtcclxuICAgICAgVmFsdWU6IGNvbXBvbmVudE51bSxcclxuICAgICAgQWN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgYWxlcnQoXCJva1wiKTtcclxuICAgICAgfVxyXG4gICB9LFxyXG4gICBBZGQ6IGNvbXBvbmVudEFkZFxyXG59KTtcclxuXHJcbnZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vZGVFZGl0b3JcIik7XHJcbnZhciBjb21wb25lbnRzID0gW2NvbXBvbmVudE51bSwgY29tcG9uZW50QWRkXTtcclxudmFyIGVkaXRvciA9IG5ldyBEM05FLk5vZGVFZGl0b3IoXCJkZW1vQDAuMS4wXCIsIGNvbnRhaW5lciwgY29tcG9uZW50cywgbWVudSk7XHJcblxyXG52YXIgbm4gPSBjb21wb25lbnROdW0ubmV3Tm9kZSgpO1xyXG5ubi5kYXRhLm51bSA9IDI7XHJcbnZhciBuMSA9IGNvbXBvbmVudE51bS5idWlsZGVyKG5uKTtcclxudmFyIG4yID0gY29tcG9uZW50TnVtLmJ1aWxkZXIoY29tcG9uZW50TnVtLm5ld05vZGUoKSk7XHJcbnZhciBhZGQgPSBjb21wb25lbnRBZGQuYnVpbGRlcihjb21wb25lbnRBZGQubmV3Tm9kZSgpKTtcclxuXHJcbm4xLnBvc2l0aW9uID0gWzgwLCAyMDBdO1xyXG5uMi5wb3NpdGlvbiA9IFs4MCwgNDAwXTtcclxuYWRkLnBvc2l0aW9uID0gWzUwMCwgMjQwXTtcclxuXHJcbmVkaXRvci5jb25uZWN0KG4xLm91dHB1dHNbMF0sIGFkZC5pbnB1dHNbMF0pO1xyXG5lZGl0b3IuY29ubmVjdChuMi5vdXRwdXRzWzBdLCBhZGQuaW5wdXRzWzFdKTtcclxuXHJcbmVkaXRvci5hZGROb2RlKG4xKTtcclxuZWRpdG9yLmFkZE5vZGUobjIpO1xyXG5lZGl0b3IuYWRkTm9kZShhZGQpO1xyXG4vLyAgZWRpdG9yLnNlbGVjdE5vZGUodG5vZGUpO1xyXG5cclxudmFyIGVuZ2luZSA9IG5ldyBEM05FLkVuZ2luZShcImRlbW9AMC4xLjBcIiwgY29tcG9uZW50cyk7XHJcbi8qXHJcbmVkaXRvci5ldmVudExpc3RlbmVyLm9uKFwiY2hhbmdlXCIsIGFzeW5jIGZ1bmN0aW9uKCkge1xyXG4gICBhd2FpdCBlbmdpbmUuYWJvcnQoKTtcclxuICAgYXdhaXQgZW5naW5lLnByb2Nlc3MoZWRpdG9yLnRvSlNPTigpKTtcclxufSk7XHJcbiovXHJcbmVkaXRvci52aWV3Lnpvb21BdChlZGl0b3Iubm9kZXMpO1xyXG5lZGl0b3IuZXZlbnRMaXN0ZW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG5lZGl0b3Iudmlldy5yZXNpemUoKTtcclxuIl19
