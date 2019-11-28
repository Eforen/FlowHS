<template>
    <g :class="`node node-group ${hover.node && selected == false ? ' node-hover hover':''}${selected ? ' node-selected selected':''}`" id="b5537584.cdacc8" :transform="`translate(${typeObj.getRootX(args)}, ${typeObj.getRootY(args)})`">
        <g v-show="button" transform="translate(-25,2)" class="node-button" opacity="1">
            <rect class="node-button-background" rx="5" ry="5" width="32" height="26" fill-opacity="1"></rect>
            <rect class="node-button-pad" x="5" y="4" rx="4" ry="4" width="16" height="18" :fill="color" cursor="pointer" fill-opacity="1"></rect>
        </g>
        <rect class="node" rx="5" ry="5" :fill="color" :width="typeObj.getWidth(args)" :height="typeObj.getHeight(args)" @mouseover="hover.node = true;" @mouseleave="hover.node = false" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseout="handleMouseOut"></rect>
        <g v-show="icon!=''" class="node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
            <rect x="0" y="0" class="node-icon-shade" width="30" :height="typeObj.getHeight(args)"></rect>
            <image xlink:href="icons/node-red/inject.svg" class="node-icon" x="0" width="30" :height="typeObj.getHeight(args)" y="0" style=""></image>
            <path :d="`M 30 1 l 0 ${typeObj.getHeight(args)-2}`" class="node-icon-shade-border"></path>
        </g>
        <text class="node-label node-label-italic" :x="typeObj.getLabelX(args)" :y="typeObj.getLabelY(args)" dy=".35em" text-anchor="start">{{title}}</text>
        <!-- <g class="node-status-group" style="display: none;">
            <rect class="node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
            <text class="node-status-label" x="20" y="10">Test</text>
        </g> -->
        <g class="node-changed" v-show="changed" :transform="`translate(${typeObj.getChangedX(args)}, ${typeObj.getChangedY(args)})`">
            <circle r="5"></circle>
        </g>
        <g class="node-error" v-show="error" :transform="`translate(${typeObj.getErrorX(args)}, ${typeObj.getErrorY(args)})`">
            <path d="M -5,4 l 10,0 -5,-8 z"></path>
        </g>
        
        <g v-for="n in inputs" v-bind:key="'input'+n" :class="`port-input${hover.inputs == n? ' port-hover hover':''}`" :transform="`translate(${typeObj.getInputX(args, n)}, ${typeObj.getInputY(args, n)})`">
            <rect class="port" rx="3" ry="3" width="10" height="10" @mouseover="hover.inputs = n" @mouseleave="hover.inputs = 0"></rect>
        </g>
        <g v-for="n in outputs" v-bind:key="'output'+n" :class="`port-output${hover.outputs == n? ' port-hover hover':''}`" :transform="`translate(${typeObj.getOutputX(args, n)}, ${typeObj.getOutputY(args, n)})`">
            <rect class="port" rx="3" ry="3" width="10" height="10" @mouseover="hover.outputs = n;" @mouseleave="hover.outputs = 0"></rect>
        </g>
        <!-- <g v-if="outputs == 1" class="flow-port-output" transform="translate(155,10)">
            <rect class="flow-port" rx="3" ry="3" width="10" height="10"></rect>
        </g>
        <g v-if="outputs == 2"  class="flow-port-output" transform="translate(155,3.5)">
            <rect class="flow-port" rx="3" ry="3" width="10" height="10"></rect>
        </g>
        <g v-if="outputs == 2"  class="flow-port-output" transform="translate(155,16.5)">
            <rect class="flow-port" rx="3" ry="3" width="10" height="10"></rect>
        </g> -->
    </g>
</template>

<style lang="css" scoped>
.node {
    stroke: #434954;
    font-family:'Courier New', Courier, monospace
}
.node .hide {
    display: none;
}
.port {
    stroke: #999;
    stroke-width: 1;
    fill: #d9d9d9;
    cursor: crosshair;
}
.node-changed {
    fill: #00bcff;
    stroke: #1c668c;
    cursor: default;
    stroke-width: 1px;
    stroke-linejoin: round;
    stroke-linecap: round;
}
.node-error {
    fill: #f60;
    stroke: #911002;
    stroke-width: 1px;
    cursor: default;
    stroke-linejoin: round;
    stroke-linecap: round;
}
.node-button-background {
    fill: #eee;
}
.node-button-pad:hover {
    fill-opacity: 0.4
}
.node-label {
    stroke-width: 0;
    fill: #333;
    font-size: 14px;
    pointer-events: none;
    user-select: none;
}
.node-label-italic {
    font-style: italic;
}
g.node-selected .node {
    stroke-width: 2;
    stroke: #ff7f0e !important;
}
g.node-hover .node {
    stroke-width: 2;
    stroke: #0ecfff !important;
}
g.port-hover .port {
    fill: #0BA5CC;
    stroke: #0ecfff !important;
}
/* g.port-hover .port {
    fill: #b65b0b;
    stroke: #ff7f0e !important;
} */
</style>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
//import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop } from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import { Node } from '../store/flows/types';
import { SelectionState } from '../store/selection/types';
import { ActionStartDrag, ActionStopDrag, SelectionPayloadSetSelected, SelectionPayloadAddSelected } from '../store/selection/actions';
import NodeTypeDictionary from '../nodes/NodeTypeDictionary';
import NodeType, { NodeTypeArgs } from '../nodes/NodeType';
import { WorkspaceState } from '../store/workspace/types';

@Component
export default class RenderNode extends Vue {
    @Getter('nodeByID', { namespace: 'flows' }) nodeByID!: (id: string)  => Node | undefined
    @Action('setSelected', { namespace: 'selection' }) setSelected!: (selectedGUIDs: SelectionPayloadSetSelected) => void;
    @Action('addSelected', { namespace: 'selection' }) addSelected!: (selectedGUIDs: SelectionPayloadAddSelected) => void;
    @Action('startDrag', { namespace: 'selection' }) startDrag!: (payload: ActionStartDrag) => void;
    @Action('stopDrag', { namespace: 'selection' }) stopDrag!: (payload: ActionStopDrag) => void;
    @State('selection') selectionStore!: SelectionState;
    @State('workspace') workspace!: WorkspaceState;

    hover: { node: boolean, inputs: number, outputs: number} = {
        node: false,
        inputs: 0,
        outputs: 0
    }

    @Prop({default:''})
    guid!: string

    get typeObj() { const node = this.nodeByID(this.guid); if(node) { return NodeTypeDictionary.getType(node.type) } else { throw 'Could not get type' }}

    // @Prop({default: ()=>({})})
    // args!: NodeTypeArgs

    @Prop({default: ()=> ({
        type: '',
        args: {
            guid: 'Not Set',
            x: 0, 
            y: 0
        },
        error: false, 
        changed: false, 
        selected: false, 
        inputState: [],
        outputState: []
    } as Node)})
    defaults!: Node

    get args(): NodeTypeArgs { return (this.nodeByID(this.guid) as Node).args || { x: 0, y: 0 } }
    // get x(): number { 
    //     const dragOffsetX = (this.selectionStore.dragging && 
    //         this.selectionStore.selectedNodes.includes(this.guid) && 
    //         this.guid.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridX : 0)
    //         * this.workspace.grid.width
    //     return this.typeObj.getRootX(this.args) + dragOffsetX
    // }
    // get y(): number {
    //     const dragOffsetY = (this.selectionStore.dragging  && 
    //         this.selectionStore.selectedNodes.includes(this.guid) && 
    //         this.guid.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridY  : 0)
    //         * this.workspace.grid.height
    //     return this.typeObj.getRootY(this.args) + dragOffsetY
    // }
    get title(): string { return this.typeObj.getTitle(this.args) }
    get error(): boolean { const node = this.nodeByID(this.guid); if(node) { return node.error } else { return false; }}
    get changed(): boolean { const node = this.nodeByID(this.guid); if(node) { return node.changed } else { return false; }}
    get selected(): boolean { return this.selectionStore.selectedNodes.indexOf(this.guid) >= 0 }
    get button(): boolean {  return this.typeObj.getButton(this.args) }
    get inputs(): number {  return this.typeObj.getInputs(this.args) }
    get outputs(): number {  return this.typeObj.getOutputs(this.args) }
    get icon(): string {  return this.typeObj.getIcon(this.args) }
    get color(): string {  return this.typeObj.getColor(this.args) }

    clickCount = 0
    watchingForDrag = false
    clickTimer: NodeJS.Timeout | null = null
    doubleClickTimer: NodeJS.Timeout | null = null
    delay = 250

    handleClick (e: MouseEvent) {
      //e.preventDefault()

      this.clickCount++

      if (this.clickCount === 1) {
        this.doubleClickTimer = setTimeout(() => {
          this.clickCount = 0
          //this.$emit('single-click')
          this.handleSingleClick(e)
        }, this.delay)
      } else if (this.clickCount === 2) {
        if(this.doubleClickTimer != null) clearTimeout(this.doubleClickTimer)
        this.clickCount = 0
        this.handleDoubleClick(e)
        //this.$emit('double-click')
      }
    }

    handleSingleClick(e: MouseEvent) {
        if(this.guid.toLowerCase()=='pallet'){
            // Do Pallet Click
            return
        }
        console.log(`${this.guid}: Clicked`)
        if(e.shiftKey){
            this.addSelected([this.guid])
        } else{
            this.setSelected([this.guid])
        }

    }

    handleDoubleClick(e: MouseEvent) {
        if(this.guid.toLowerCase()=='pallet'){
            // Do Pallet Click
            return
        }
        console.log(`${this.guid}: Double Clicked`)
    }

    handleDrag() {
        if(this.guid.toLowerCase()=='pallet'){
            // Don't do normal stuff
            return
        }
        console.log(`${this.guid}: Drag`)
    }

    handleDragStart() {
        if(this.guid.toLowerCase()=='pallet'){
            // Don't do normal stuff
            return
        }
        console.log(`${this.guid}: DragStart`)
    }

    handleDragEnd() {
        if(this.guid.toLowerCase()=='pallet'){
            // Don't do normal stuff
            return
        }
        console.log(`${this.guid}: DragEnd`)
    }

    handleMouseDown(e: MouseEvent) {
        e.preventDefault()
        this.watchingForDrag = true
        this.clickTimer = setTimeout(() => {
            if(this.clickTimer != null) {
                clearTimeout(this.clickTimer)
                this.clickTimer = null
            }
            if(this.guid.toLowerCase()=='pallet'){
                // Don't do normal stuff
                return
            }
            this.$emit('startDrag', this.guid)
            this.startDrag({source: this.guid, startX: e.screenX, startY: e.screenY})
        }, this.delay)
        console.log(`${this.guid}: MouseDown`)
        console.log(e)
    }

    handleMouseUp(e: MouseEvent) {
        e.preventDefault()
        console.log(`${this.guid}: MouseUp`)
        console.log(e)
        if(this.clickTimer != null) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null
            this.handleClick(e)
        } else {
            if(this.guid.toLowerCase()=='pallet'){
                // Don't do normal stuff
                return
            }
            this.stopDrag({commitMove: true, endX: e.screenX, endY: e.screenY})
        }
    }

    handleMouseOut(e: MouseEvent) {
        console.log(`${this.guid}: MouseOut`)
        console.log(e)
        
        if(this.clickTimer != null) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null
            if(this.guid.toLowerCase()=='pallet'){
                // Don't do normal stuff
                return
            }
            this.$emit('startDrag', this.guid)
            this.startDrag({source: this.guid, startX: e.screenX, startY: e.screenY})
        }
    }

    // closeWindow() {
    //   ipcRenderer.sendSync("closeWindow", "main")
    // }
}
</script>
