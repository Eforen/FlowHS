<template>
    <div :class="`palette-node ${available? 'available':''}`" data-palette-type="inject" :style="{paddingLeft: button ? '-30px' : '0px', marginLeft: button ? '35px' : '10px', height: '28px'}">
        <div v-show="button"  class="palette-button">
            <div class="palette-button-background"></div>
            <div class="palette-button-pad" :style="{backgroundColor: color}"></div>
        </div>
        <div class="palette-body" :style="{ backgroundColor:typeObj.getColor(args), height: '28px'  }" ></div>
        <div class="palette-label" dir="">{{title}}</div>
        <div class="palette-icon-container">
            <div class="palette-icon" style="background-image: url(&quot;/icons/subdirectory_arrow_right-24px.svg&quot;);"></div>
        </div>
        <div class="palette-port palette-port-output"
            v-for="n in outputs"
            :key="'output'+n"
            :style="{top: `${typeObj.getOutputY(args, n)}px`}"></div>
        <div class="palette-port palette-port-input"
            v-for="n in inputs"
            :key="'input'+n"
            :style="{top: `${typeObj.getInputY(args, n)}px`}"></div>
        <!--
        <div class="draggable" draggable="true" @dragstart="handleDragStart">
          <svg class="draggable" height="40">
            <RenderNode :defaults="{
              guid: 'Pallet',
              x: 2, 
              y: 0,
              title: 'Pin Out: A', 
              error: false, 
              changed: false, 
              selected: false, 
              button: false, 
              inputs: 1, 
              outputs: 0, 
              icon: '', 
              color: '#a6bbcf',
              inputState: [],
              outputState: []
            }"/>
          </svg>
        </div>
        -->
    </div>
</template>

<style lang="css" scoped>
.palette-button {
    position: absolute;
    top: 1px;
    left: -25px;
}
.palette-button-background {
    border: 1px solid #434954;
    border-radius: 5px;
    width: 32px;
    height: 26px;
}
.palette-button-pad {
    position: absolute;
    left: 5px;
    top: 5px;
    border: 1px solid #434954;
    border-radius: 4px;
    width: 16px;
    height: 16px;
}
.palette-node {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
}
.palette-node.available .palette-body {
    position: relative;
    width: 100%;
    border: 1px solid #434954;
    border-radius: 5px !important;
    border-color: #434954;
    border-width: 1px;
    font-family:'Courier New', Courier, monospace;
    z-index: 10;
    cursor: grab;
}
.palette-node .hide {
    display: none;
}
.palette-port {
    position: absolute;
    box-sizing: border-box;
    border: 1px solid #999;
    background-color: #d9d9d9;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    z-index: 15;
    /* cursor: grabbing; */
}
.palette-port-output {
    right: -5px;
}
.palette-port-input {
    left: -5px;
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

.palette-button{
    position: absolute;
    z-index: 5;
}
.palette-button-background {
    background-color: #eee;
}
.palette-label {
    color: #333;
    font-size: 14px;
    border-width: 0;
    user-select: none;
    line-height: 20px;
    /* margin: 4px 0 4px 8px; */
    position: absolute;
    top: 4px;
    left: 8px;
    z-index: 15;
}
.palette-label-italic {
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
import NodeType, { NodeTypeArgs } from '../nodes/NodeType';
import NodeTypeDictionary from '../nodes/NodeTypeDictionary';

@Component
export default class RenderNodeSpawnProxy extends Vue {
    @Action('setSelected', { namespace: 'selection' }) setSelected!: (selectedGUIDs: SelectionPayloadSetSelected) => void;
    @Action('startDrag', { namespace: 'selection' }) startDrag!: (payload: ActionStartDrag) => void;
    @Action('stopDrag', { namespace: 'selection' }) stopDrag!: (payload: ActionStopDrag) => void;
    @State('selection') selectionStore!: SelectionState;

    hover: { node: boolean, inputs: number, outputs: number} = {
        node: false,
        inputs: 0,
        outputs: 0
    }

    @Prop({default:''})
    guid!: string

    @Prop({required: true})
    type!: string | NodeType<any>

    get typeObj() { if(typeof this.type == "string") return NodeTypeDictionary.getType(this.type); else return this.type }

    @Prop({default: {}})
    args!: NodeTypeArgs

    @Prop({default: ()=> ({
        error: false, 
        changed: false, 
        selected: false, 
        type: '',
        args: {
            guid: 'Not Set',
            x: 0, 
            y: 0
        },
        inputState: [],
        outputState: []
    } as Node)})
    defaults!: Node

    // get xPos() { return this.x * this.xGridSize }
    // get yPos() { return this.y * this.yGridSize }
    // get maxPinCount() { return Math.max(0, this.outputs, this.inputs) }
    // get heightMod() { return Math.max(0, ( this.maxPinCount - 2 )) * 15}
    // get totalHeight() { return 30 + this.heightMod }
    // get yOffsetMod() { return (7.5 * Math.max(0, ( this.maxPinCount - 2 ))) }
    // get firstOutPinY() { return ((this.totalHeight - 10) - (13 * (this.outputs - 1))) / 2 - 1 }
    // get firstInPinY() { return ((this.totalHeight - 10) - (13 * (this.inputs - 1))) / 2 - 1 }
    // get yOffset() { return (( Math.ceil( this.totalHeight / this.yGridSize ) * this.yGridSize ) - this.totalHeight) / 2}
    // get textWidthEstimation() { return 14 * this.title.length * 0.6 }
    // get neededWidth() { return (this.icon!=''? 30 : 0) + 8 + this.textWidthEstimation + 8 } //30 8 text 8
    // get desiredWidth() { return ( Math.ceil( this.neededWidth / this.xGridSize ) * this.xGridSize ) }

    @Prop({ default: 20 })
    xGridSize!: number
    @Prop({ default: 20 })
    yGridSize!: number

    get x(): number { 
        return 0
    }
    get y(): number {
        return 0
    }
    @Prop({default: true })
    available!: boolean
    @Prop({default: false })
    error!: boolean
    @Prop({default: false })
    changed!: boolean
    @Prop({default: false })
    selected!: boolean

    get title() { return this.typeObj.getTitle(this.args) }
    get button() { return this.typeObj.getButton(this.args) }
    get inputs() { return this.typeObj.getInputs(this.args) }
    get outputs() { return this.typeObj.getOutputs(this.args) }
    get icon() { return this.typeObj.getIcon(this.args) }
    get color() { return this.typeObj.getColor(this.args) }

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
