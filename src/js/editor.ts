import * as jQuery from 'jquery';
const $ = jQuery;
// @ts-ignore
import 'bootstrap';
import * as fs from 'fs';
import { ipcRenderer as ipc } from 'electron';

import * as path from 'path';

let baseDir = path.resolve(__dirname, '..')

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

import * as MyEditor from './includes/MyEditor';

//import * as BuildIn from './BuiltInChips';
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

//TODO: Replace with Own ContextMenu Component
var menu = new MyEditor.ContextMenu({
  Chip:BuildIn.Chip,
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

menu.onClickOverride = (item) => {
    if (item instanceof D3NE.Component) {
        let node = item.newNode();

        item.builder(node);
        editor.addNode(node, true);
        editor.selectNode(node);
    }
    else
        item();

    //this.contextMenu.hide();
};
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


window.closeWindow = () => {
  ipc.sendSync("closeWindow", "editor")
}

window.minWindow = () => {
  ipc.sendSync("minWindow", "editor")
}

var getSaveData = window.getSaveData = () => {
  return JSON.stringify({props:props, chip:editor.toJSON()})
}

var newRecentFiles = () => {

  if(currentFileName == "NewFile.fhsc"){
    console.log("NewFile not updating recentFilesList");
    return
  }
  let recentFilesLocation = eRequire('path').resolve(dirName, '..', 'data', 'recentFiles.json');
  var loadRecent = JSON.parse(fs.readFileSync(recentFilesLocation));
  for (var i = 0; i < loadRecent.length; i++) {
    if(loadRecent[i].file == currentFileName){
      loadRecent.splice(i, 1)
      i--;
    }
  }
  var now = new Date();
  var pretty = [
    (now.getMonth() + 1) < 10 ? ("0" + (now.getMonth() + 1)) : (now.getMonth() + 1),
    '/',
    now.getDate() < 10 ? "0" + now.getDate() : now.getDate(),
    '/',
    now.getFullYear(),
    ' ',
    now.getHours(),
    ':',
    now.getMinutes()
  ].join('');
  loadRecent.unshift({name:props.ChipName, file:currentFileName, date:pretty})
  while(loadRecent.length > 10){
    loadRecent.pop()
  }
  fs.writeFileSync(recentFilesLocation, JSON.stringify(loadRecent));
  ipc.send("updateRecentFiles")
}

window.onClickSave =()=>{
  if(currentFileName == "NewFile.fhsc"){
    if(newFileName != ""){
    }
    saveAsFile()
  } else{
    saveFile()
  }
}

window.onClickSaveAs =()=>{
    saveAsFile()
}

$(window).keypress(function(e) {
  //console.log(e.which);
  if (e.ctrlKey && e.shiftKey && e.which === 19) { //Ctrl+Shift+S
    console.log('Ctrl+Shift+S');
    window.onClickSaveAs()
    e.preventDefault();
    return false;
  } else if (e.ctrlKey && e.which === 19) { //Ctrl+S
    console.log('Ctrl+S');
    window.onClickSave()
    e.preventDefault();
    return false;
  }
  return true
});

var saveFile = () => {
  if(currentFileName == "NewFile.fhsc"){
    window.saveAsFile()
    return
  }

  fs.writeFileSync(fileLocation, getSaveData());
  newRecentFiles()
  window.savedStateAcurate = true
  updateTitle()
}
/*
window.saveFilePart2 = () => {
    $('#SaveConfirm').modal('hide')
    var fileName = newFileName != "" ? newFileName : currentFileName
    var saveFileLocation = eRequire('path').resolve(dirName, '..', 'data', 'saves', fileName);
    fs.writeFileSync(saveFileLocation, getSaveData());
    newRecentFiles(fileName)
    window.savedStateAcurate = true
    updateTitle()
}
*/

var saveAsFile = () => {
  //var saveFileLocation = eRequire('path').resolve(dirName, '..', 'data', 'saves', fileName);
  //var fileName = currentFileName != "" ? newFileName : currentFileName
  //$('#SaveAs #filename').val(fileName)
  //$('#SaveAs').modal('show')
  var filename = dialog.showSaveDialog({
    filters: [{ name: 'FlowHS Chip file', extensions: ['fhsc'] }],
    defaultPath: fileLocation
  })

  if (filename == undefined) return
  //fileLocation = dialog.showMessageBox({ message: "The file is: "+filename, buttons: ["OK"] });

  fileLocation = filename

	if(fileLocation.includes(baseDir)) {
		currentFileName = fileLocation.substring(baseDir.length+1)
	}

  //fileName = prompt("Please enter a filename:", fileName);
  //currentFileName = fileName.substr(fileName.length - 5) == ".fhsc" ? fileName : (fileName + ".fhsc");
  saveFile()
}


window.onEnterDo = (action)=>{
  if(event.key === 'Enter') {
    action()
  }
}
/*
window.saveAsPart2 = ()=>{
  $('#SaveAs').modal('hide')
  var fileName = ""+$('#SaveAs #filename').val()
  if(filename=="" || filename==".fhsc") return
  currentFileName = fileName.substr(fileName.length - 5) == ".fhsc" ? fileName : (fileName + ".fhsc");
  saveFile()
}

$('#SaveAs').on('shown.bs.modal', function () {
  $('#SaveAs #filename').trigger('focus')
})
*/

var props = window.FileProps = {}

var setDefaultProps = ()=>{
  props = window.FileProps = {
    FileSyntaxVersion: 1,
    ChipName: "Untitled",
    nextPinIN: 0,
    nextPinOUT: 0
  }
}

setDefaultProps()

//var fileLocationType = 0
var fileLocation = eRequire('path').resolve(dirName, '..', 'data', 'saves', "NewFile.fhsc");

var openFile = (e, arg) => {
  console.log("Recieved Command to open " + arg );
    //currentFileName = arg.substr(arg.length - 5) == ".fhsc" ? arg : (arg + ".fhsc");
  var saveFileLocation = eRequire('path').resolve(dirName, '..', 'data', 'saves', arg);
  //var newfileLocationType = 0
  console.log(fs.existsSync(saveFileLocation)+":"+saveFileLocation);
  if(fs.existsSync(saveFileLocation) == false){
    saveFileLocation = eRequire('path').resolve(dirName, '..', arg);
    console.log(fs.existsSync(saveFileLocation)+":"+saveFileLocation);
    //newfileLocationType = 1
    if(fs.existsSync(saveFileLocation) == false){
      //saveFileLocation = eRequire('path').resolve(arg);
      //newfileLocationType = 2
      console.log(fs.existsSync(arg)+":"+arg);
      if(fs.existsSync(arg) == false){
        dialog.showMessageBox({ message: "Could not load file: "+arg, buttons: ["OK"] });
        return
      }
    }
  }
  fileLocation = saveFileLocation
  //fileLocationType = newfileLocationType
  if(arg == "Default.fhsc")
    currentFileName = "NewFile.fhsc";
  else
    currentFileName = arg
  var saveData = JSON.parse(fs.readFileSync(saveFileLocation));

  setDefaultProps()
  if(saveData.props) Object.assign(props, saveData.props)

  window.savedStateAcurate = true
  updateTitle()
  if(saveData.props)
    editor.fromJSON(saveData.chip)
  else
    editor.fromJSON(saveData)
  newRecentFiles(currentFileName)
  setTimeout(function () {
    window.savedStateAcurate = true
    updateTitle()
    //console.log("Save Valid...")
  }, 50);
}

ipc.on("openFile", openFile)


  /////////////////////
 // File Menu Stuff //
/////////////////////

$("#EditorPage #FileMenu #menu #btnSave").tooltip()
$("#EditorPage #FileMenu #menu #btnRename").tooltip()
$("#EditorPage #FileMenu #menu #btnTestChip").tooltip()

  ///////////////////
 // Chip Testing //
//////////////////

var testRunning = false
var testPinIns = []
var testPinInValues = []
var testPinOuts = []
var testProgress = 0
var testProgressMax = 0
var testOutput = ""


window.onClickTestChip = () => {
  if(testRunning) return
  testRunning = true
  testPinIns = allnodes.filter((node)=>{
    if (node.title == "Bit Pin (Chip Input)") return true
    return false
  })
  if(testPinIns == 0){
    testRunning = false
    return
  }
  testPinOuts = allnodes.filter((node)=>{
    if (node.title == "Bit Pin (Chip Output)") return true
    return false
  })

  var output = ""
  for (var i = 0; i < testPinIns.length; i++) {
    testPinInValues[i] = false;
    testPinIns[i].outputs[0].value = false
    testPinIns[i].controls[0].setValue(testPinInValues[i])
    testPinIns[i].procLogic()
  }

  //$("#TestingAlert").alert("show")
  if(testPinIns.length>32){
    window.debug = $("#TestingAlert #TestProgress .progress-bar").attr('aria-valuemax', testPinIns.length).css('width', '0%').attr('aria-valuenow', 0)
  } else{
    window.debug = $("#TestingAlert #TestProgress .progress-bar").attr('aria-valuemax', Math.pow(2,testPinIns.length)).css('width', '0%').attr('aria-valuenow', 0)
    testProgressMax = Math.pow(2,testPinIns.length+1)
  }

  setTimeout(testingNextStep, 5);
  testProgress = 0
  testOutput = ""
  setTimeout(testingUpdateProgress, 250);
  $("#TestingAlert").show(250)
}
$("#TestingAlert").alert()
$("#TestingAlert").hide()

var testingUpdateProgress = ()=>{
  if(testRunning == false){
    $("#TestingAlert").hide(1000)
    return
  }
  if(testPinIns.length>32)
    $("#TestingAlert #TestProgress .progress-bar").css('width', (testProgress/testPinIns.length*100)+'%').attr('aria-valuenow', testProgress)
  else{
    var pos = 0;
    for (var i = 0; i < testPinInValues.length; i++) {
      if(testPinInValues[i]) pos++
      pos = pos << 1 //111110110111010000
    }
    $("#TestingAlert #TestProgress .progress-bar").css('width', (pos/testProgressMax*100)+'%').attr('aria-valuenow', pos)
  }
  setTimeout(testingUpdateProgress, 250);
}

var testingNextStep = () => {
  if(window.NodeLogicProc > 0) {
    setTimeout(testingNextStep, 5);
    return
  }

  var pos = testPinInValues.length-1
  while(pos >= 0){
    if(testPinInValues[pos]){
      //Set false and continue
      testPinInValues[pos] = false
      pos--
    } else{
      //Set true and exit
      testPinInValues[pos] = true
      break;
    }
  }
  //console.log(testPinInValues);
  if(pos >= 0){
    if(testPinIns.length > 32 && testPinIns.length-pos > testProgress) testProgress = pos
    for (var i = testPinIns.length-1; i >= pos; i--) {
      testPinIns[i].outputs[0].value = testPinInValues[i]
      testPinIns[i].controls[0].setValue(testPinInValues[i])
      testPinIns[i].procLogic()
    }
    var output = ""

    for (var i = 0; i < testPinIns.length; i++) {
      output += testPinIns[i].outputs[0].value ? 1 : 0
    }
    output+="|"
    for (var i = 0; i < testPinOuts.length; i++) {
      output += testPinOuts[i].outputValue ? 1 : 0
    }
    //console.log(output);
    testOutput += "\n"+output
    //console.log(testPinInValues);
    //console.log(testPinIns);
    setTimeout(testingNextStep, 1);
  }else{
    $('#ChipTestOutput .modal-body').html("<pre>"+testOutput+"</pre>")
    $('#ChipTestOutput').modal('show')
    console.log("End Of Test")
    testRunning = false
  }
}

  /////////////////
 // Rename Chip //
/////////////////


window.onClickRename = ()=>{
  $('#RenameDialog #chipname').val(props.ChipName)
  $('#RenameDialog').modal('show')
}

window.renamePart2 = ()=>{
  $('#RenameDialog').modal('hide')
  props.ChipName = ""+$('#RenameDialog #chipname').val()
  saveStateFalse()
  updateTitle()
}

$('#RenameDialog').on('shown.bs.modal', function () {
  $('#RenameDialog #chipname').trigger('focus')
})


  ////////////////////////
 // Titlebar Handeling //
////////////////////////

var currentFileName = "NewFile.fhsc"
var newFileName = ""
window.savedStateAcurate = true

var saveStateFalse = window.saveStateFalse = (param) => {
  window.savedStateAcurate = false
  updateTitle()
  //console.log("Save Invalid...")
}
editor.eventListener.on('connectioncreate', saveStateFalse);
editor.eventListener.on('connectionremove', saveStateFalse);
editor.eventListener.on('nodecreate', saveStateFalse);
editor.eventListener.on('groupcreate', saveStateFalse);
editor.eventListener.on('connectioncreate', saveStateFalse);
editor.eventListener.on('noderemove', saveStateFalse);
editor.eventListener.on('groupremove', saveStateFalse);
editor.eventListener.on('connectionremove', saveStateFalse);

var updateTitle = ()=>{
  var state = currentFileName
  if(newFileName!="" && newFileName != currentFileName) state += " => " + newFileName
  if(window.savedStateAcurate == false) state += "*"
  $("#EditorPage .titlebar span.title").html("FlowHS Editor ("+state+") "+props.ChipName)
}


  /////////////////////////
 // Default State Setup //
/////////////////////////


openFile(null, 'Default.fhsc')

editor.view.zoomAt(editor.nodes);
//editor.eventListener.trigger("change");
editor.view.resize();
