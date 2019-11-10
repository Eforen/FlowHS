<template>
    <g class="node node-group node-selected" id="b5537584.cdacc8" :transform="`translate(${x}, ${y})`">
        <g transform="translate(-25,2)" class="node-button" opacity="1">
            <rect class="node-button-background" rx="5" ry="5" width="32" height="26" fill-opacity="1"></rect>
            <rect class="node-button-pad" x="5" y="4" rx="4" ry="4" width="16" height="18" :fill="color" cursor="pointer" fill-opacity="1"></rect>
        </g>
        <rect class="node" rx="5" ry="5" :fill="color" width="160" height="30"></rect>
        <g v-show="icon!='none'" class="node-icon-group" x="0" y="0" transform="translate(0, 0)" style="pointer-events: none;">
            <rect x="0" y="0" class="node-icon-shade" width="30" height="30"></rect>
            <image xlink:href="icons/node-red/inject.svg" class="node-icon" x="0" width="30" height="30" y="0" style=""></image>
            <path d="M 30 1 l 0 28" class="node-icon-shade-border"></path>
        </g>
        <text class="node-label node_label_italic" x="38" dy=".35em" text-anchor="start" y="14">{{title}}</text>
        <g class="node-status-group" style="display: none;">
            <rect class="node-status" x="6" y="1" width="9" height="9" rx="2" ry="2" stroke-width="3"></rect>
            <text class="node-status-label" x="20" y="10"></text></g>
            <g class="node-changed" v-show="changed" transform="translate(150, -2)">
                <circle r="5"></circle>
            </g>
            <g class="node-error" v-show="error" transform="translate(150, -2)">
                <path d="M -5,4 l 10,0 -5,-8 z"></path>
            </g>
        <g v-for="n in outputs" v-bind:key="'output'+n" class="flow-port-output" :transform="`translate(155,${13 * (n - 1) + firstOutPinY})`">
            <rect class="flow-port" rx="3" ry="3" width="10" height="10">{{firstOutPinY}}</rect>
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
}
.node .hide {
    display: none;
}
.flow-port {
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
</style>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop } from 'vue-property-decorator'
import {ipcRenderer} from 'electron'

@Component
export default class RenderNode extends Vue {

    get maxPinCount() { return Math.max(0, this.outputs, this.inputs) }
    get heightMod() { return Math.max(0, ( this.maxPinCount - 2 )) * 15}
    get totalHeight() { return 30 + this.heightMod }
    get yOffset() { return -7.5 * Math.max(0, ( this.maxPinCount - 2 )) }
    get firstOutPinY() { return ((this.totalHeight - 10) - (13 * (this.outputs - 1))) / 2 }
    get firstInPinY() { return ((this.totalHeight - 10) - (13 * (this.inputs - 1))) / 2 }
  
    @Prop()
    x!: number

    @Prop()
    y!: number

    @Prop({ default: 'Node'})
    title!: string

    @Prop({ default: 0})
    inputs!: number

    @Prop({ default: 0})
    outputs!: number

    @Prop({ default: 'none'})
    icon!: string

    @Prop({ default: false})
    error!: boolean

    @Prop({ default: false})
    changed!: boolean

    @Prop({ default: '#a6bbcf'})
    color!: string

    // closeWindow() {
    //   ipcRenderer.sendSync("closeWindow", "main")
    // }
}
</script>
