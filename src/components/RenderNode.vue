<template>
    <g :class="`node node-group ${hover.node && selected == false ? ' node-hover hover':''}${selected ? ' node-selected selected':''}`" id="b5537584.cdacc8" :transform="`translate(${xPos}, ${yPos + yOffset})`">
        <g v-show="button" transform="translate(-25,2)" class="node-button" opacity="1">
            <rect class="node-button-background" rx="5" ry="5" width="32" height="26" fill-opacity="1"></rect>
            <rect class="node-button-pad" x="5" y="4" rx="4" ry="4" width="16" height="18" :fill="color" cursor="pointer" fill-opacity="1"></rect>
        </g>
        <rect class="node" rx="5" ry="5" :fill="color" :width="desiredWidth" :height="totalHeight" @mouseover="hover.node = true;" @mouseleave="hover.node = false" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseout="handleMouseOut"></rect>
        <g v-show="icon!=''" class="node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
            <rect x="0" y="0" class="node-icon-shade" width="30" :height="totalHeight"></rect>
            <image xlink:href="icons/node-red/inject.svg" class="node-icon" x="0" width="30" :height="totalHeight" y="0" style=""></image>
            <path :d="`M 30 1 l 0 ${28 + heightMod}`" class="node-icon-shade-border"></path>
        </g>
        <text class="node-label node-label-italic" :x="icon!='' ? 38 : 8" dy=".35em" text-anchor="start" :y="14 + yOffsetMod">{{title}}</text>
        <g class="node-status-group" style="display: none;">
            <rect class="node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
            <text class="node-status-label" x="20" y="10">Test</text>
        </g>
        <g class="node-changed" v-show="changed" transform="translate(150, -2)">
            <circle r="5"></circle>
        </g>
        <g class="node-error" v-show="error" transform="translate(150, -2)">
            <path d="M -5,4 l 10,0 -5,-8 z"></path>
        </g>
        
        <g v-for="n in inputs" v-bind:key="'input'+n" :class="`port-input${hover.inputs == n? ' port-hover hover':''}`" :transform="`translate(-5,${13 * (n - 1) + firstInPinY})`">
            <rect class="port" rx="3" ry="3" width="10" height="10" @mouseover="hover.inputs = n" @mouseleave="hover.inputs = 0"></rect>
        </g>
        <g v-for="n in outputs" v-bind:key="'output'+n" :class="`port-output${hover.outputs == n? ' port-hover hover':''}`" :transform="`translate(${desiredWidth - 5},${13 * (n - 1) + firstOutPinY})`">
            <rect class="port" rx="3" ry="3" width="10" height="10" @mouseover="hover.outputs = n;" @mouseleave="hover.outputs = 0">{{firstOutPinY}}</rect>
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
import { ActionStartDrag, ActionStopDrag, SelectionPayloadSetSelected } from '../store/selection/actions';

@Component
export default class RenderNode extends Vue {
    @Getter('nodeByID', { namespace: 'flows' }) nodeByID!: (id: string)  => Node | undefined
    @Action('setSelected', { namespace: 'selection' }) setSelected!: (selectedGUIDs: SelectionPayloadSetSelected) => void;
    @Action('startDrag', { namespace: 'selection' }) startDrag!: (payload: ActionStartDrag) => void;
    @Action('stopDrag', { namespace: 'selection' }) stopDrag!: (payload: ActionStopDrag) => void;
    @State('selection') selectionStore!: SelectionState;

    hover: { node: boolean, inputs: number, outputs: number} = {
        node: false,
        inputs: 0,
        outputs: 0
    }

    @Prop()
    guid!: string

    @Prop({default: ()=> ({
        guid: 'Not Set',
        x: 0, 
        y: 0,
        title: 'Node', 
        error: false, 
        changed: false, 
        selected: false, 
        button: false, 
        inputs: 0, 
        outputs: 0, 
        icon: '', 
        color: '#a6bbcf',
        inputState: [],
        outputState: []
    } as Node)})
    defaults!: Node

    get xPos() { return this.x * this.xGridSize }
    get yPos() { return this.y * this.yGridSize }
    get maxPinCount() { return Math.max(0, this.outputs, this.inputs) }
    get heightMod() { return Math.max(0, ( this.maxPinCount - 2 )) * 15}
    get totalHeight() { return 30 + this.heightMod }
    get yOffsetMod() { return (7.5 * Math.max(0, ( this.maxPinCount - 2 ))) }
    get firstOutPinY() { return ((this.totalHeight - 10) - (13 * (this.outputs - 1))) / 2 }
    get firstInPinY() { return ((this.totalHeight - 10) - (13 * (this.inputs - 1))) / 2 }
    get yOffset() { return (( Math.ceil( this.totalHeight / this.yGridSize ) * this.yGridSize ) - this.totalHeight) / 2}
    get textWidthEstimation() { return 14 * this.title.length * 0.6 }
    get neededWidth() { return (this.icon!=''? 30 : 0) + 8 + this.textWidthEstimation + 8 } //30 8 text 8
    get desiredWidth() { return ( Math.ceil( this.neededWidth / this.xGridSize ) * this.xGridSize ) }

    @Prop({ default: 20 })
    xGridSize!: number
    @Prop({ default: 20 })
    yGridSize!: number

    get x(): number { 
        const node = this.nodeByID(this.guid)
        const dragOffsetX = (this.selectionStore.dragging ? this.selectionStore.dragOffsetGridX : 0)
        if(node) { 
            return (node.x || this.defaults.x) + dragOffsetX
        } else {
            return this.defaults.x + dragOffsetX;
        }
    }
    get y(): number {
        const node = this.nodeByID(this.guid)
        const dragOffsetY = (this.selectionStore.dragging ? this.selectionStore.dragOffsetGridY : 0)
        if(node) {
            return (node.y || this.defaults.y) + dragOffsetY
        } else {
        return this.defaults.y + dragOffsetY;
        }
    }
    get title(): string { const node = this.nodeByID(this.guid); if(node) { return node.title || this.defaults.title } else { return this.defaults.title; }}
    get error(): boolean { const node = this.nodeByID(this.guid); if(node) { return node.error || this.defaults.error } else { return this.defaults.error; }}
    get changed(): boolean { const node = this.nodeByID(this.guid); if(node) { return node.changed || this.defaults.changed } else { return this.defaults.changed; }}
    get selected(): boolean { return this.selectionStore.selectedNodes.indexOf(this.guid) >= 0 }
    get button(): boolean { const node = this.nodeByID(this.guid); if(node) { return node.button || this.defaults.button } else { return this.defaults.button; }}
    get inputs(): number { const node = this.nodeByID(this.guid); if(node) { return node.inputs || this.defaults.inputs } else { return this.defaults.inputs; }}
    get outputs(): number { const node = this.nodeByID(this.guid); if(node) { return node.outputs || this.defaults.outputs } else { return this.defaults.outputs; }}
    get icon(): string { const node = this.nodeByID(this.guid); if(node) { return node.icon || this.defaults.icon } else { return this.defaults.icon; }}
    get color(): string { const node = this.nodeByID(this.guid); if(node) { return node.color || this.defaults.color } else { return this.defaults.color; }}

    clickCount = 0
    watchingForDrag = false
    clickTimer: NodeJS.Timeout | null = null
    doubleClickTimer: NodeJS.Timeout | null = null
    delay = 250

    handleClick (e: any) {
      //e.preventDefault()

      this.clickCount++

      if (this.clickCount === 1) {
        this.doubleClickTimer = setTimeout(() => {
          this.clickCount = 0
          //this.$emit('single-click')
          this.handleSingleClick()
        }, this.delay)
      } else if (this.clickCount === 2) {
        if(this.doubleClickTimer != null) clearTimeout(this.doubleClickTimer)
        this.clickCount = 0
        this.handleDoubleClick()
        //this.$emit('double-click')
      }
    }

    handleSingleClick() {
        console.log(`${this.guid}: Clicked`)
        this.setSelected([this.guid])
    }

    handleDoubleClick() {
        console.log(`${this.guid}: Double Clicked`)
    }

    handleDrag() {
        console.log(`${this.guid}: Drag`)
    }

    handleDragStart() {
        console.log(`${this.guid}: DragStart`)
    }

    handleDragEnd() {
        console.log(`${this.guid}: DragEnd`)
    }

    handleMouseDown(e: MouseEvent) {
        this.watchingForDrag = true
        this.clickTimer = setTimeout(() => {
            if(this.clickTimer != null) {
                clearTimeout(this.clickTimer)
                this.clickTimer = null
            }
            this.$emit('startDrag', this.guid)
            this.startDrag({source: this.guid, startX: e.x, startY: e.y})
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
            this.stopDrag({commitMove: true, endX: e.x, endY: e.y})
        }
    }

    handleMouseOut(e: MouseEvent) {
        console.log(`${this.guid}: MouseOut`)
        console.log(e)
        
        if(this.clickTimer != null) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null
            this.$emit('startDrag', this.guid)
            this.startDrag({source: this.guid, startX: e.x, startY: e.y})
        }
    }

    // closeWindow() {
    //   ipcRenderer.sendSync("closeWindow", "main")
    // }
}
</script>
