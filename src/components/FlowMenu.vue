<template>
    <div class="FlowMenu">
        <ol>
            <li id="rename" @click="onClickItem('rename')">Rename</li>
            <li id="save" @click="onClickItem('save')">Save</li>
            <li id="close" @click="onClickItem('close')">Close</li>
        </ol>
    </div>
</template>

<style lang="css" scoped>
    .FlowMenu {
        z-index: 1000;
        position: absolute;
        top: 25px;
        left: -1px;
        background-color: #434954;
        border-color: #2E333A;
        border-style: solid;
        border-width: 1px;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: none;
        cursor: pointer;
    }
    .FlowMenu > ol {
        margin: 0;
        list-style: none;
        padding: 0;
    }
    .FlowMenu > ol > li {
        padding: 0.5em;
        border-top: #2E333A solid 1px;
    }
    .FlowMenu > ol > li:first-child {
        border-top: none;
    }
    .FlowMenu > ol > li:hover {
        background-color: #707a8d;
        cursor: pointer;
    }
</style>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
//import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop } from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import { Node } from '../store/flows/types';
import { SelectionState } from '../store/selection/types';
import { ActionStartDragNode, ActionStopDrag, SelectionPayloadSetSelected, SelectionPayloadAddSelected, ActionStartDragConnection } from '../store/selection/actions';
import NodeTypeDictionary from '../nodes/NodeTypeDictionary';
import NodeType, { NodeTypeArgs } from '../nodes/NodeType';
import { WorkspaceState } from '../store/workspace/types';

@Component
export default class FlowMenu extends Vue {
    @State('selection') selectionStore!: SelectionState;
    @State('workspace') workspace!: WorkspaceState;

    @Prop({default:''})
    flowGUID!: string

    onClickItem(item: string){
        switch (item) {
            case 'rename':
                console.log(`Menu: Rename Flow #${this.flowGUID}`)
                break;
            case 'save':
                console.log(`Menu: Save Flow #${this.flowGUID}`)
                break;
            case 'close':
                console.log(`Menu: Close Flow #${this.flowGUID}`)
                break;
            default:
                break;
        }
    }
}
</script>
