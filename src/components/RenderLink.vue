<template>
    <g :class="{link: true, hover: (somethingDragging == false && hovering) }" :transform="`translate(0, 0)`" @mouseover="hovering = true" @mouseleave="hovering = false">
        <path class="selector" :d="d" :style="{strokeWidth:states.length * 3 + 2 * 3}" :transform="`translate(0, 0)`"></path>
        <path class="outline" :d="d" :style="{strokeWidth:states.length * 3 + 2}" :transform="`translate(0, 0)`"></path>
        <path v-if="dragging" class="line drag" :d="d" :style="{strokeWidth:states.length * 3 }" :transform="`translate(0, 0)`"></path>
        <path v-else v-for="(activity, index) in states" :key="`cores-${index}`" :transform="`translate(0, ${states.length * -1 + index * 3})`" :class="{core: true, active:activity}" :d="d"></path>
    </g>
</template>

<style lang="css" scoped>

.link .selector {
    stroke: transparent !important;
    cursor: crosshair;
    fill: none;
    pointer-events: all;
}
.link .outline {
    stroke: #434954 !important;
    cursor: crosshair;
    fill: none;
    pointer-events: none;
}
.link .line {
    stroke: #0ecfff !important;
    fill: none;
    pointer-events: none;
}
.link .core{
    stroke: #999 !important;
    stroke-width: 3;
    fill: none;
    pointer-events: none;
}
.link.hover .core {
    stroke: #0ecfff !important;
}

.link .core.drag {
    stroke: #0ecfff !important;
}
.link .core.active{
    stroke: #0c9413 !important;
}

g.port-hover .port {
    fill: #0BA5CC;
    stroke: #0ecfff !important;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
//import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop } from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import { SelectionState } from '@/store/selection/types';
//import { ActionStartDrag, ActionStopDrag, SelectionPayloadSetSelected, SelectionPayloadAddSelected } from '@/store/selection/actions';
import NodeTypeDictionary from '@/nodes/NodeTypeDictionary';
import NodeType, { NodeTypeArgs } from '@/nodes/NodeType';
import { Node, Flow, FlowsState } from '@/store/flows/types';
import { WorkspaceState } from '@/store/workspace/types';

@Component
export default class RenderLink extends Vue {
    @Getter('nodeByID', { namespace: 'flows' }) nodeByID!: (id: string)  => Node | undefined
    // @Action('setSelected', { namespace: 'selection' }) setSelected!: (selectedGUIDs: SelectionPayloadSetSelected) => void;
    // @Action('addSelected', { namespace: 'selection' }) addSelected!: (selectedGUIDs: SelectionPayloadAddSelected) => void;
    // @Action('startDrag', { namespace: 'selection' }) startDrag!: (payload: ActionStartDrag) => void;
    // @Action('stopDrag', { namespace: 'selection' }) stopDrag!: (payload: ActionStopDrag) => void;
    @State('flows') flows!: FlowsState
    @State('selection') selectionStore!: SelectionState;
    @State('workspace') workspace!: WorkspaceState;

    hovering: boolean = false

    @Prop({default:''})
    guid!: string

    get conStoreState(){
        if(this.guid == '') return null
        return this.flows.connections[this.guid]
    }

    @Prop({default: ()=>[false]})
    states!: boolean[]

    @Prop({default: ''})
    overrideFrom!: string
    @Prop({default: -1})
    overrideFromPin!: number

    get from(){
        if(this.overrideFrom != undefined && this.overrideFrom != '') return this.overrideFrom
        if(this.conStoreState != undefined  && this.conStoreState != null) return this.conStoreState.fromID
        return ''
    }

    get fromPin(){
        if(this.overrideFromPin != undefined && this.overrideFromPin != -1) {
            return this.overrideFromPin
        }
        if(this.conStoreState != undefined && this.conStoreState != null) {
            return this.conStoreState.fromPort
        }
        return -1
    }
    
    get fromTypeObj() {
        // if(this.from == "0c3e1188-fd9a-4be2-923e-29053b71ad64") 
        //     console.log("wtf")
        // if(this.guid == "88d022b9-19cc-4d5b-b144-8a9fd81f95fe") {
        //     console.log("wtaf")
        // }
        //console.log(this)
        const node = this.nodeByID(this.from);
        if(node) { return NodeTypeDictionary.getType(node.type) }
        else { throw 'Could not get type' }
    }

    get fromArgs(): NodeTypeArgs { return (this.nodeByID(this.from) as Node).args as NodeTypeArgs }

    get fromX() { return this.fromTypeObj.getOutputX(this.fromArgs, this.fromPin, true) + 5 }
    //get fromY() { return this.fromTypeObj.getOutputY(this.fromArgs, this.fromPin, true) + 5 + this.fromTypeObj.getHeight(this.fromArgs) / 2 }
    get fromY() { return this.fromTypeObj.getOutputY(this.fromArgs, this.fromPin, true) + 5 }

    // get fromRootX(): number { 
    //     const node = this.nodeByID(this.from)
    //     const dragOffsetX = (this.selectionStore.dragging && 
    //         this.selectionStore.selected.includes(this.from) && 
    //         this.from.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridX : 0)
    //     return ((node as Node).args.x + dragOffsetX) * this.workspace.grid.width
    // }
    // get fromRootY(): number {
    //     const node = this.nodeByID(this.from)
    //     const dragOffsetY = (this.selectionStore.dragging  && 
    //         this.selectionStore.selected.includes(this.from) && 
    //         this.from.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridY : 0)
    //     return ((node as Node).args.y + dragOffsetY) * this.workspace.grid.height
    // }
    // get fromTitle(): string { const node = this.nodeByID(this.from); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getTitle(node.args) } else { return 'ERROR'; }}
    // get fromIcon(): string { const node = this.nodeByID(this.from); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getIcon(node.args) } else { return ''; }}
    // get fromTextWidthEstimation() { return 14 * this.fromTitle.length * 0.6 }
    // get fromNeededWidth() { return (this.fromIcon!=''? 30 : 0) + 8 + this.fromTextWidthEstimation + 8 } //30 8 text 8
    // get fromDesiredWidth() { return ( Math.ceil( this.fromNeededWidth / this.workspace.grid.width ) * this.workspace.grid.height ) }
    // get fromFirstOutPinY() { return ((this.fromTotalHeight - 10) - (13 * (this.fromOutputs - 1))) / 2 }
    // get fromInputs(): number { const node = this.nodeByID(this.from); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getInputs(node.args) } else { return 0; }}
    // get fromOutputs(): number { const node = this.nodeByID(this.from); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getOutputs(node.args) } else { return 0; }}
    // get fromMaxPinCount() { console.log({fromOutputs: this.fromOutputs, fromInputs: this.fromInputs}); return Math.max(0, this.fromOutputs, this.fromInputs) }
    // get fromHeightMod() { return Math.max(0, ( this.fromMaxPinCount - 2 )) * 15}
    // get fromTotalHeight() { return 30 + this.fromHeightMod }
    // get fromX() { return this.fromRootX + this.fromDesiredWidth - 5 + 5}
    // get fromY() { console.log(((( Math.ceil( this.fromTotalHeight / this.workspace.grid.height ) * this.workspace.grid.height ) - this.fromTotalHeight) / 2)); return this.fromRootY + (13 * (this.fromPin) + this.fromFirstOutPinY) + ((( Math.ceil( this.fromTotalHeight / this.workspace.grid.height ) * this.workspace.grid.height ) - this.fromTotalHeight) / 2) + 5}
    
    @Prop({default:''})
    overrideTo!: string
    @Prop({default: -1})
    overrideToPin!: number

    get somethingDragging(){
        return this.selectionStore.draggingConnection || this.selectionStore.draggingNode
    }

    get to(){
        if(this.overrideTo != undefined && this.overrideTo != '') return this.overrideTo
        if(this.conStoreState != undefined && this.conStoreState != null) return this.conStoreState.toID
        return ''
    }

    get toPin(){
        if(this.overrideToPin != undefined && this.overrideToPin != -1) return this.overrideToPin
        if(this.conStoreState != undefined && this.conStoreState != null) return this.conStoreState.toPort
        return -1
    }
    
    get toTypeObj() {
        const node = this.nodeByID(this.to);
        if(node) { return NodeTypeDictionary.getType(node.type) }
        else { throw 'Could not get type' }
    }

    get toArgs(): NodeTypeArgs { return (this.nodeByID(this.to) as Node).args as NodeTypeArgs }

    get toX() { return this.toTypeObj.getInputX(this.toArgs, this.toPin, true) + 5 }
    //get toY() { return this.toTypeObj.getInputY(this.toArgs, this.toPin, true) + 5 + this.toTypeObj.getHeight(this.toArgs) / 2  }
    get toY() { return this.toTypeObj.getInputY(this.toArgs, this.toPin, true) + 5  }

    // get toRootX(): number { 
    //     const node = this.nodeByID(this.to)
    //     const dragOffsetX = (this.selectionStore.dragging && 
    //         this.selectionStore.selected.includes(this.to) && 
    //         this.to.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridX : 0)
    //     return ((node as Node).args.x + dragOffsetX) * this.workspace.grid.width
    // }
    // get toRootY(): number {
    //     const node = this.nodeByID(this.to)
    //     const dragOffsetY = (this.selectionStore.dragging  && 
    //         this.selectionStore.selected.includes(this.to) && 
    //         this.to.toLowerCase()!='pallet' ? 
    //             this.selectionStore.dragOffsetGridY : 0)
    //     return ((node as Node).args.y + dragOffsetY) * this.workspace.grid.height
    // }
    // get toTitle(): string { const node = this.nodeByID(this.to); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getTitle(node.args) } else { return 'ERROR'; }}
    // get toIcon(): string { const node = this.nodeByID(this.to); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getIcon(node.args) } else { return ''; }}
    // get toTextWidthEstimation() { return 14 * this.toTitle.length * 0.6 }
    // get toNeededWidth() { return (this.toIcon!=''? 30 : 0) + 8 + this.toTextWidthEstimation + 8 } //30 8 text 8
    // get toDesiredWidth() { return ( Math.ceil( this.toNeededWidth / this.workspace.grid.width ) * this.workspace.grid.height ) }
    // get toFirstInPinY() { return ((this.toTotalHeight - 10) - (13 * (this.toInputs - 1))) / 2 }
    // get toInputs(): number { const node = this.nodeByID(this.to); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getInputs(node.args) } else { return 0; }}
    // get toOutputs(): number { const node = this.nodeByID(this.to); if(node) { const type = NodeTypeDictionary.getType(node.type); return type.getOutputs(node.args) } else { return 0; }}
    // get toMaxPinCount() { return Math.max(0, this.toOutputs, this.toInputs) }
    // get toHeightMod() { return Math.max(0, ( this.toMaxPinCount - 2 )) * 15}
    // get toTotalHeight() { return 30 + this.toHeightMod }
    // get toX() { return this.toRootX - 5 + 5 }
    // get toY() { return this.toRootY + (13 * (this.toPin) + this.toFirstInPinY) + (( Math.ceil( this.toTotalHeight / this.workspace.grid.height ) * this.workspace.grid.height ) - this.toTotalHeight) / 2 + 5 }

    @Prop({default:false})
    dragging!: boolean

    @Prop({default:180})
    setStartX!: number
    @Prop({default:140})
    setStartY!: number

    @Prop({default:471})
    setEndX!: number
    @Prop({default:202})
    setEndY!: number

    static CONTROL_FORCE = 75

    //get startX() { return 180 } //180
    //get startY() { return 140 } //140
    get startX() { return this.from == ''? this.setStartX : this.fromX } //180
    get startY() { return this.from == ''? this.setStartY : this.fromY } //140

    get startControlX() { return this.startX + RenderLink.CONTROL_FORCE } //255
    get startControlY() { return this.startY } //140

    get endControlX() { return this.endX - RenderLink.CONTROL_FORCE } //396
    get endControlY() { return this.endY } //202

    get endX() { return this.to == ''? this.setEndX : this.toX } //471
    get endY() { return this.to == ''? this.setEndY : this.toY  } //202
    // get endX() { return 471 } //471
    // get endY() { return 202 } //202

    get d() { 
        return `M ${this.startX} ${this.startY} C ${this.startControlX} ${this.startControlY} ${this.endControlX} ${this.endControlY} ${this.endX} ${this.endY} ` 
    }
}
</script>
