<template>
  <v-container>
    <div class="pallet">
      <div class="pallet-searchBox">
        <div class="pallet-searchBox-container">
          <v-icon class="pallet-searchBox-icon" dark>mdi-magnify</v-icon>
          <input type="text" v-model="node_filter" class="pallet-searchBox-input" placeholder="filter nodes"/>
            <v-icon class="pallet-searchBox-clear" dark v-show="node_filter!=''" v-on:click="node_filter=''">mdi-close</v-icon>
          <span class="pallet-searchBox-resultCount hide"></span>
        </div>
      </div>
      <div class="pallet-container">
        <div class="pallet-group" v-for="(group, groupName) in palette" :key="`pallet-group-${groupName}`">
          <header>{{groupName}}</header>
          <div class="pallet-group-children">
            <RenderNodeSpawnProxy v-for="(proxy, index) in group" v-bind:key="`pallet-group-${groupName}-${index}`" :id="proxy[0]" :type="proxy[1]" :args="proxy[2]" draggable="true" :ondragstart="`event.dataTransfer.setData('id', '${proxy[0]}'); event.dataTransfer.setData('type', '${JSON.stringify(proxy[1])}'); event.dataTransfer.setData('args', '${JSON.stringify(proxy[2])}'); console.log('Set event Data')`" @dragstart="handleDragStart($event)"/>
          </div>
        </div>
      </div>
      <div class="pallet-controlbar">
      </div>
    </div>
    <div class="workspace">
      <div class="workspace-tabs">
        <div class="container">
          <div v-for="(flowID, index) in workspace.editor.loadedFlows" v-bind:key="`workspace-tabs-${index}-${flowID}`" :flowID="flowID" :class="{selected:(index == workspace.editor.selectedFlow)}" @click="handleTabClick" >{{index}}</div>
        </div>
        <v-btn
        id="add"
        class="button"
        target="_blank"
        icon
        small dark
        v-on:click="AddNewFlow"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
        <v-btn
        id="menu"
        class="button"
        target="_blank"
        icon
        small dark
        v-on:click="OpenFlowsMenu"
      >
        <v-icon v-if="true">mdi-menu</v-icon>
        <v-icon v-if="false">mdi-menu-open</v-icon>
      </v-btn>
      </div>
      <!--
      workspace.size.height: 250,
      workspace.size.width: 250,
      workspace.grid.height: 20,
      workspace.grid.width: 20,
      -->
      <div class="workspace-chart">
        <svg :class="{dragging: false}" :width="workspace.size.width * workspace.grid.width" :height="workspace.size.height * workspace.grid.height" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter" @dragover="allowDrop($event)" @drop="handleDragDrop($event)">
          <g transform="scale(1)">
            <g class="grid" @mouseup="handleMouseUp">
              <rect class="workspace-chart-background" :width="workspace.size.width * workspace.grid.width" :height="workspace.size.height * workspace.grid.height"></rect>
              <g v-if="flowLoaded" class="workspace-chart-grid" style="visibility: visible;">
                
              <line class="workspace-chart-grid-h" v-for="n in workspace.size.height" v-bind:key="'wcgh'+n" x1="0" :x2="workspace.size.width * workspace.grid.width"  :y1="n*workspace.grid.height" :y2="n*workspace.grid.height"></line>
              <line class="workspace-chart-grid-v" v-for="n in workspace.size.height" v-bind:key="'wcgv'+n" y1="0" :y2="workspace.size.width * workspace.grid.width"  :x1="n*workspace.grid.height" :x2="n*workspace.grid.height"></line>
              </g>
            </g>
            <g class="selector">
              <RenderLink v-if="doTheThing" from="debug1" :fromPin=0 to="debug2" :toPin=0 :states="[true]"/>
              <RenderLink v-else :endX="debug ? debug.offsetX : 0" :endY="debug ? debug.offsetY : 0" :states="[true,false,true]"/>
            </g>
            <g class="links"></g>
            <g class="nodes">
              <RenderNode v-for="id in nodesInFlowCalc" v-bind:key="`RenderNode-${id}`" :guid="id" @startMouseDown="handleStartMouseDown"/>
            </g>
            <g v-show="debug != null">
              <g v-show="debugMode == 'move'" class="drag-debug drag-debug-move" style=" fill: #ae00ff; stroke: #740291; cursor: default; stroke-width: 1px; stroke-linejoin: round; stroke-linecap: round;" :transform="`translate(${debug==null? 0 : debug.offsetX}, ${debug==null? 0 : debug.offsetY})`">
                  <path d="M -5,4 l 10,0 -5,-8 z"></path>
              </g>
              <g v-show="debugMode == 'drop'" class="drag-debug drag-debug-drop" style=" fill: #00ff55; stroke: #1c8c34; cursor: default; stroke-width: 1px; stroke-linejoin: round; stroke-linecap: round;" :transform="`translate(${debug==null? 0 : debug.offsetX}, ${debug==null? 0 : debug.offsetY})`">
                  <circle r="5"></circle>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="workspace-bottomBar">
      </div>
    </div>
    <div class="sidebar"> </div>
  </v-container>
</template>

<style lang="css" scoped>
  .workspace-chart svg.dragging {
    pointer-events: all
  }
  .workspace-chart svg.dragging g {
    pointer-events: none
  }
  .pallet {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 180px;
    background: #434954;
    border: 1px solid #2E333A;
    box-sizing: border-box;
    transition: width 0.2s ease-in-out;
  }
  .pallet-searchBox-container {
    position: relative;
    font-size: 14px;
    color: #EDEDED !important;
    width: 100%;
    height: 30px;
  }
  .pallet-searchBox-container input {
    padding: 3px 17px 3px 30px;
    height: 30px;
    width: 100%;
  }
  .pallet-searchBox-container i.pallet-searchBox-icon {
    position: absolute;
    pointer-events: none;
    left: 8px;
    top: 9px;
    font-size: 16px;
  }
  .pallet-searchBox-container i.pallet-searchBox-clear {
    position: absolute;
    right: 8px;
    top: 9px;
    font-size: 16px;
  }

  .workspace {
    position: absolute;
    left: 180px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: auto;
    height: auto;
    background: #000;
  }
  .workspace .workspace-chart {
    width: 100%;
    height: 100%;
    overflow: scroll
  }
  /* Let's get this party started */
  .workspace .workspace-chart::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background: #434954;
  }
 
/* Track */
  .workspace .workspace-chart::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
 
/* Handle */
  .workspace .workspace-chart::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(136, 136, 136, 0.281); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }
  /*.workspace .workspace-chart::-webkit-scrollbar              {  1  }*/
  /* .workspace .workspace-chart::-webkit-scrollbar-button       {  } 2 */
  /*.workspace .workspace-chart::-webkit-scrollbar-track        {  }  3 */
  /*.workspace .workspace-chart::-webkit-scrollbar-track-piece  {  }  4 */
  /*.workspace .workspace-chart::-webkit-scrollbar-thumb        {  }  5 */
  .workspace .workspace-chart::-webkit-scrollbar-corner       { background: #434954; } /* 6 */
  /*.workspace .workspace-chart::-webkit-resizer                {  }  7 */

  .workspace .workspace-chart::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(136,136,136,0.4); 
  }

  .workspace .workspace-chart svg {
    cursor: crosshair;
    pointer-events: all;
  }

  .workspace .workspace-chart .workspace-chart-background {
    fill: #434954;
  }
  .workspace .workspace-chart .workspace-chart-grid line {
    fill: none;
    shape-rendering: crispEdges;
    stroke: #383C45;
    stroke-width: 1px;
  }
  svg.draggable {
    pointer-events: none;
  }
  div.draggable {
    cursor: grab;
  }

  .pallet-group header{
    background-color: #00000050;
    margin-bottom: .25em;
    border-bottom: 1px solid #383C45;
    border-top: 2px solid #383C45;
    padding-left: 1em;
    color: #ffffffCC;
  }

  .workspace-tabs {
    height: 35px;
    background-color: #434954;
    position: relative;
  }
  
  .workspace-tabs > .container {
    position: absolute;
    bottom: 0;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #2E333A;
    padding-left: 0.5em;
  }
  
  .workspace-tabs > .container > div {
    display: inline-block;
    border: 1px solid #2E333A;
    padding-right: 1em;
    padding-left: 0.5em;
    margin-bottom: -1px;
    margin-right: 4px;
    color: rgb(168, 168, 168);
    background-color: rgba(0,0,0,0.15);
    cursor: pointer;
  }
  .workspace-tabs > .container > div.selected {
    border-bottom: 1px solid #434954;
    font-weight: bold;
    color: rgb(197, 197, 197);
    background-color: #434954;
    cursor: crosshair;
  }

  .workspace-tabs > button {
    position: absolute;
    color: rgb(168, 168, 168) !important;
    bottom: 0;
    border: 1px solid #2E333A;
    border-radius: 0;
  }

  .workspace-tabs > button#add {
    right: 36px;
  }
  .workspace-tabs > button#menu {
    right: 4px;
  }
</style>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';
import { State, Action, Getter } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator'
import RenderLink from './components/RenderLink.vue';
import RenderNode from './components/RenderNode.vue';
import RenderNodeSpawnProxy from './components/RenderNodeSpawnProxy.vue';
import { ipcRenderer } from 'electron'
import { Node, Flow, FlowsState } from './store/flows/types';
import NodeType, { NodeTypeArgs } from './nodes/NodeType';
import { ntPinIn, ntPinOut, IPinArgs } from './nodes/types/Pins';
import uuid from 'uuid';
import { SelectionState } from './store/selection/types';
import { ActionStopDrag, ActionUpdateDrag, SelectionPayloadSetSelected } from './store/selection/actions';
import { WorkspaceState } from './store/workspace/types';
import NodeTypeDictionary from './nodes/NodeTypeDictionary';
import Command from './store/commands/Command';
import CMDAddNode from '@/store/commands/cmds/CMDAddNode';
import { mount } from '@vue/test-utils';
import CMDMoveNode from './store/commands/cmds/CMDMoveNode';
import CMDGroup from './store/commands/cmds/CMDGroup';

@Component({
  components: {
    RenderLink,
    RenderNode,
    RenderNodeSpawnProxy
  } 
})
export default class Editor extends Vue {

  @State('flows') flows!: FlowsState
  @Action('createFlow', { namespace: 'flows' }) createFlow!: (flow: Flow) => void;
  @Action('createNodeInFlow', { namespace: 'flows' }) createNodeInFlow!: (payload: {flowID: string, node: Node}) => void
  @Action('DoCMD', { namespace: 'commands' }) doCMD!: (cmd: Command) => void
  @Action('UndoCMD', { namespace: 'commands' }) undoCMD!: () => void
  @Action('RedoCMD', { namespace: 'commands' }) redoCMD!: () => void
  @Getter('nodesInFlow', { namespace: 'flows' }) nodesInFlow!: (id: string)  => string[]
  @State('selection') selectionStore!: SelectionState;
  @Action('stopDrag', { namespace: 'selection' }) stopDrag!: (payload: ActionStopDrag) => void;
  @Action('updateDrag', { namespace: 'selection' }) updateDrag!: (payload: ActionUpdateDrag) => void;
  @Action('setSelected', { namespace: 'selection' }) setSelected!: (selectedGUIDs: SelectionPayloadSetSelected) => void;
  @Action('deleteNode', { namespace: 'flows' }) deleteNode!: (nodeID: string) => void;
  @State('workspace') workspace!: WorkspaceState;
  @Getter('flowLoaded', { namespace: 'workspace' }) flowLoaded!: boolean;
  @Getter('loadedFlow', { namespace: 'workspace' }) loadedFlow!: string;
  @Action('LoadFlow', { namespace: 'workspace' }) LoadFlow!: (flowID: string) => void;
  @Action('SelectFlow', { namespace: 'workspace' }) SelectFlow!: (flowID: string) => void;
  @Action('SelectPrevFlow', { namespace: 'workspace' }) SelectPrevFlow!: () => void;
  @Action('SelectNextFlow', { namespace: 'workspace' }) SelectNextFlow!: () => void;

  created(){
    window.addEventListener('keydown', this.keydown, true)
  }

  destroyed(){
    window.removeEventListener('keydown', this.keydown, true)
  }

  keydown(ev: KeyboardEvent){
    if(ev.ctrlKey){
      if(ev.shiftKey){
        if(ev.key == 'Z'){
          console.log('Shortcut: Redo Action')
          this.redoCMD()
          return
        }
      } else {
        if(ev.key == 'z'){
          console.log('Shortcut: Undo Action')
          this.undoCMD()
          return
        }
        if(ev.key == 'y'){
          console.log('Shortcut: Redo Action')
          this.redoCMD()
          return
        }
      }
    } else {
      if(ev.shiftKey){
        if(ev.key == 'ArrowUp'){
          ev.preventDefault()
          console.log('Shortcut: Move Up Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 0, -1 * this.workspace.prefrences.shiftMove, true))))
          return
        } else if(ev.key == 'ArrowDown'){
          ev.preventDefault()
          console.log('Shortcut: Move Down Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 0, 1 * this.workspace.prefrences.shiftMove, true))))
          return
        } else if(ev.key == 'ArrowLeft'){
          ev.preventDefault()
          console.log('Shortcut: Move Left Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, -1 * this.workspace.prefrences.shiftMove, 0, true))))
          return
        } else if(ev.key == 'ArrowRight'){
          ev.preventDefault()
          console.log('Shortcut: Move Right Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 1 * this.workspace.prefrences.shiftMove, 0, true))))
          return
        }
      } else {
        if(ev.key == 'Delete'){
          console.log('Shortcut: Delete Action')
        } else if(ev.key == 'ArrowUp'){
          ev.preventDefault()
          console.log('Shortcut: Move Up Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 0, -1, true))))
          return
        } else if(ev.key == 'ArrowDown'){
          ev.preventDefault()
          console.log('Shortcut: Move Down Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 0, 1, true))))
          return
        } else if(ev.key == 'ArrowLeft'){
          ev.preventDefault()
          console.log('Shortcut: Move Left Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, -1, 0, true))))
          return
        } else if(ev.key == 'ArrowRight'){
          ev.preventDefault()
          console.log('Shortcut: Move Right Action')
          this.doCMD(new CMDGroup(this.selectionStore.selectedNodes.map(guid => new CMDMoveNode(guid, 1, 0, true))))
          return
        }
      }
    }
    console.log('Keyboard Event')
    console.log(this)
    console.log(ev)
  }

  get nodesInFlowCalc(): string[] {
    try {
      //console.log(this.selectedFlow)
      //console.log(this.loadedFlows[this.selectedFlow])
      // console.log(this.flows.flows[this.loadedFlows[this.selectedFlow]])
      // console.log(this.flows.flows[this.loadedFlows[this.selectedFlow]].nodes)
      // console.log(this.flows)
      // return this.flows.flows[this.loadedFlows[this.selectedFlow]].nodes
      //return this.nodesInFlow(this.loadedFlows[this.selectedFlow])
      return this.nodesInFlow(this.loadedFlow)
    } catch{
      return []
    }
  }

  palette: {[index: string]: [string, NodeType<any>, any][]} = {
    IO: [
      ['PinIn', NodeTypeDictionary.getType('PinIn'), { pinName: 'A' } as IPinArgs],
      ['PinOut', NodeTypeDictionary.getType('PinOut'), { pinName: 'A' } as IPinArgs],
    ]
  }

  node_filter: string = ''
  // selectedFlow: number = -1
  // loadedFlows: string[] = []

  AddNewFlow() {
    //this.createFlow({guid:'root', title: '', isProxy: false, filename: '', error: false, changed: true, inputs: [], outputs: [], nodes:[], connections: []})
    //this.loadedFlows.push('root')
    //this.selectedFlow = this.loadedFlows.length - 1
    const guid = uuid.v4()
    this.createFlow({guid, title: '', isProxy: false, filename: '', error: false, changed: true, inputs: [], outputs: [], nodes:[], connections: []})
    this.LoadFlow(guid)
  }
  AddNewNode() {
    // x=2 y=7 title="Pin in: A" :error="false" :changed="false" :selected="false" :inputs="12" :outputs="6" icon='' :button="false"
    //const node: Node = { guid: '', x: 0, y: 0, title: '', error: false, changed: false, selected: false, button: false, inputs: 0, outputs: 0, icon: '', color: '', inputState: [], outputState: []}
    const node: Node = { guid: uuid.v4(), x: 2, y: 7, type: 'PinIn', args: {pinName:'A'} as IPinArgs, error: false, changed: false, selected: false, inputState: [], outputState: []}
    //this.createNodeInFlow({flowID: 'root', node})
    //this.doCMD(new CMDAddNode(node, this.loadedFlows[this.selectedFlow]))
    this.doCMD(new CMDAddNode(node, this.loadedFlow))
  }
  // closeWindow() {
  //   ipcRenderer.sendSync("closeWindow", "main")
  // },

  // minWindow() {
  //   ipcRenderer.sendSync("minWindow", "main")
  // },
  doTheThing = false
  OpenFlowsMenu(e: MouseEvent) {
      console.log(`Open Flow Menu`)
    let node: Node = { guid: 'debug1', x: 2, y: 7, type: 'PinIn', args: {pinName:'A'} as IPinArgs, error: false, changed: false, selected: false, inputState: [], outputState: []}
    this.doCMD(new CMDAddNode(node, this.loadedFlow))
    node = { guid: 'debug2', x: 10, y: 20, type: 'PinOut', args: {pinName:'A'} as IPinArgs, error: false, changed: false, selected: false, inputState: [], outputState: []}
    this.doCMD(new CMDAddNode(node, this.loadedFlow))
    this.doTheThing = true
  }
  
  handleTabClick(e: MouseEvent) {
      const flowID = ((e.target as HTMLElement).attributes.getNamedItem('flowid') as Attr).value
      console.log(`tab Clicked: ${flowID}`)
      this.SelectFlow(flowID)
      // console.log(arg1)
      // console.log(arg2)
      // console.log(arg3)
  }


  handleStartMouseDown(guid: string) {
      console.log(`${guid}: Parent MouseDown`)
  }
  handleMouseMove(e: MouseEvent) {
    if (this.workspace) {
      if(this.selectionStore.dragging){
        console.log(`MouseMove`)
        const gridX = Math.round((e.screenX - this.selectionStore.mouseStartX) / this.workspace.grid.width)
        const gridY = Math.round((e.screenY - this.selectionStore.mouseStartY) / this.workspace.grid.height)
        // const gridX = Math.round(e.offsetX / this.workspace.grid.width)
        // const gridY = Math.round(e.offsetY / this.workspace.grid.height)
        // const gridX = Math.round((e.offsetX - this.selectionStore.mouseStartX) / this.workspace.grid.width)
        // const gridY = Math.round((e.offsetY - this.selectionStore.mouseStartY) / this.workspace.grid.height)
        if(this.selectionStore.dragOffsetGridX != gridX || this.selectionStore.dragOffsetGridY != gridY){
          this.updateDrag({ gridX, gridY })
          console.log(e)
        }
      } else{
        this.debug = e
      }
    } else {
      console.log('Workspace Not Ready')
    }
  }
  handleMouseUp(e: MouseEvent) {
      console.log(`MouseUp`)
      
      if(this.selectionStore.dragging){
        this.stopDrag({commitMove: true, endX: e.offsetX, endY: e.offsetY})
      } else{
        this.setSelected([])
      }
  }
  handleMouseEnter(e: MouseEvent) {
    // If entering with button down and drag is set consider drag still valid
    // If endering with button up and drag is set consider drag invalid and end it imidiately with a fail set
    // If drag not set then do nothing
    //console.log(`Mouse enter`)
    //console.log(e)
  }

  handleDragStart(e: DragEvent) {
    console.log(`DragStart`)
    console.log(e)
  }

  allowDrop(e: DragEvent) {
    e.preventDefault()
    // this.debug = e
    // this.debugMode = 'over'
  }

  handleDragDrop(e: DragEvent) {
    console.log(`DragDrop`)
    //console.log(e)
    if(e.dataTransfer != null){
      console.log({
        id: e.dataTransfer.getData('id'),
        type: JSON.parse(e.dataTransfer.getData('type')),
        args: JSON.parse(e.dataTransfer.getData('args'))
      })
      const type: string = e.dataTransfer.getData('id')
      const args: IPinArgs = JSON.parse(e.dataTransfer.getData('args'))
      const x: number = Math.round((e.offsetX - this.workspace.grid.width / 2 ) / this.workspace.grid.width)
      const y: number = Math.round((e.offsetY - this.workspace.grid.height / 2 ) / this.workspace.grid.height)
      const node: Node = { guid: uuid.v4(), x, y, type, args, error: false, changed: false, selected: false, inputState: [], outputState: []}
      //this.doCMD(new CMDAddNode(node)) //TODO: Move Selected flow into the store and then change this to this the selected default
      //this.doCMD(new CMDAddNode(node, this.loadedFlows[this.selectedFlow]))
      this.doCMD(new CMDAddNode(node, this.loadedFlow))
      //console.log((e.dataTransfer.getData('type') as any).title)
    }
    // this.debug = e
    // this.debugMode = 'drop'
  }

  debug: MouseEvent | null = null
  debugMode: string = 'none'
  // debugDrag(e: MouseEvent) {
  //   // console.log(`DragStart`)
  //   // console.log(e)
  //   this.debug = e
  //   this.debugMode = 'move'
  // }

  // von(e: any){
  //   if(this.debugMode == 'move'){
  //     console.log('v-on')
  //     console.log(e)
  //   }
  // }

  // debugDragEnter(e: MouseEvent) {
  //   e.preventDefault()
  //   // console.log(`DragStart`)
  //   // console.log(e)
  //   this.debug = e
  //   this.debugMode = 'enter'
  // }

  // debugDragOver(e: MouseEvent) {
  //   e.preventDefault()
  //   // console.log(`DragStart`)
  //   // console.log(e)
  //   this.debug = e
  //   this.debugMode = 'over'
  // }

  // debugDragDrop(e: MouseEvent) {
  //   console.log(`DragDrop`)
  //   console.log(e)
  //   this.debug = e
  //   this.debugMode = 'drop'
  // }

  // handleDragEnd(e: MouseEvent) {
  //   console.log(`DragDrop`)
  //   console.log(e)
  //   this.debug = e
  //   this.debugMode = 'end'
  // }

  // handleElemDrop(e: MouseEvent) {
  //   console.log(`DragDrop`)
  //   console.log(e)
  //   this.debug = e
  //   this.debugMode = 'elmdrop'
  // }
}
</script>
