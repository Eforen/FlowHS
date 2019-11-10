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
      </div>
      <div class="pallet-controlbar">
      </div>
    </div>
    <div class="workspace">
      <div class="workspace-tabs">
        <v-btn
        class="button"
        target="_blank"
        icon
        small dark
        v-on:click="AddNewNode"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
        <v-btn
        class="button"
        target="_blank"
        icon
        small dark
        v-on:click="AddNewFlow"
      >
        <v-icon>mdi-folder-plus-outline</v-icon>
      </v-btn>
      </div>
      <!--
      workspace.size.height: 250,
      workspace.size.width: 250,
      workspace.grid.height: 20,
      workspace.grid.width: 20,
      -->
      <div class="workspace-chart">
        <svg :width="workspace.size.width * workspace.grid.width" :height="workspace.size.height * workspace.grid.height">
          <g transform="scale(1)">
            <g class="grid">
              <rect class="workspace-chart-background" :width="workspace.size.width * workspace.grid.width" :height="workspace.size.height * workspace.grid.height"></rect>
              <g class="workspace-chart-grid" style="visibility: visible;">
                
              <line class="workspace-chart-grid-h" v-for="n in workspace.size.height" v-bind:key="'wcgh'+n" x1="0" :x2="workspace.size.width * workspace.grid.width"  :y1="n*workspace.grid.height" :y2="n*workspace.grid.height"></line>
              <line class="workspace-chart-grid-v" v-for="n in workspace.size.height" v-bind:key="'wcgv'+n" y1="0" :y2="workspace.size.width * workspace.grid.width"  :x1="n*workspace.grid.height" :x2="n*workspace.grid.height"></line>
              </g>
            </g>
            <g class="selector"></g>
            <g class="links"></g>
            <g class="nodes">
              <RenderNodeX v-for="id in nodesInFlowCalc" v-bind:key="`RenderNode-${id}`" :guid="id"/>
            </g>
          </g>
        </svg>
      </div>
      <div class="workspace-tabs">
      </div>
    </div>
    <div class="sidebar"> </div>
  </v-container>
</template>

<style lang="css" scoped>
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
</style>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';
import { State, Action, Getter } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator'
import RenderNodeX from './components/RenderNodeX.vue';
import { ipcRenderer } from 'electron'
import { Node, Flow, FlowsState } from './store/flows/types';
import uuid from 'uuid';

@Component({
  components: {
     RenderNodeX,
  } 
})
export default class Editor extends Vue {

  @State('flows') flows!: FlowsState
  @Action('createFlow', { namespace: 'flows' }) createFlow!: (flow: Flow) => void;
  @Action('createNodeInFlow', { namespace: 'flows' }) createNodeInFlow!: (payload: {flowID: string, node: Node}) => void
  @Getter('nodesInFlow', { namespace: 'flows' }) nodesInFlow!: (id: string)  => string[]

  get nodesInFlowCalc(): string[] {
    try {
      console.log(this.selectedFlow)
      console.log(this.loadedFlows[this.selectedFlow])
      // console.log(this.flows.flows[this.loadedFlows[this.selectedFlow]])
      // console.log(this.flows.flows[this.loadedFlows[this.selectedFlow]].nodes)
      // console.log(this.flows)
      // return this.flows.flows[this.loadedFlows[this.selectedFlow]].nodes
      return this.nodesInFlow(this.loadedFlows[this.selectedFlow])
    } catch{
      return []
    }
  }

  node_filter: string = ''
  workspace = {
    size: {
      height: 250,
      width: 250,
    },
    grid: {
      height: 20,
      width: 20,
    },
  }
  selectedFlow: number = 0
  loadedFlows: string[] = ['root']

  AddNewFlow() {
    this.createFlow({guid:'root', title: '', isProxy: false, filename: '', error: false, changed: true, inputs: [], outputs: [], nodes:[], connections: []})
  }
  AddNewNode() {
    // x=2 y=7 title="Pin in: A" :error="false" :changed="false" :selected="false" :inputs="12" :outputs="6" icon='' :button="false"
    //const node: Node = { guid: '', x: 0, y: 0, title: '', error: false, changed: false, selected: false, button: false, inputs: 0, outputs: 0, icon: '', color: '', inputState: [], outputState: []}
    const node: Node = { guid: uuid.v4(), x: 2, y: 7, title: 'Pin in: A', error: false, changed: false, selected: false, button: false, inputs: 1, outputs: 2, icon: '', color: '#a6bbcf', inputState: [], outputState: []}
    this.createNodeInFlow({flowID: 'root', node})
  }
    // closeWindow() {
    //   ipcRenderer.sendSync("closeWindow", "main")
    // },

    // minWindow() {
    //   ipcRenderer.sendSync("minWindow", "main")
    // },
}
</script>
