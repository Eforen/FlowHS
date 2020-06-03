<template>
    <div class="FlowMenu">
        <ol>
            <li id="rename" @click="onClickItem('rename')">Rename</li>
            <li id="save" @click="onClickItem('save')">Save</li>
            <li id="close" @click="onClickItem('close')">Close</li>
        </ol>
        <v-overlay
            v-if="renaming"
            :absolute="absolute"
            value="overlay"
        >
            <v-container>
                <v-row>
                    <v-col cols="12">
                    <v-text-field
                        v-model="renamingName"
                        label="New Name"
                        outlined
                    >{{renamingName}}</v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-btn block color="error" @click="renaming = false">Cancel</v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn block color="primary" @click="onFinishRename">Rename</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-overlay>
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
import { Node, FlowsState } from '../store/flows/types';
import { SelectionState } from '../store/selection/types';
import { ActionStartDragNode, ActionStopDrag, SelectionPayloadSetSelected, SelectionPayloadAddSelected, ActionStartDragConnection } from '../store/selection/actions';
import NodeTypeDictionary from '../nodes/NodeTypeDictionary';
import NodeType, { NodeTypeArgs } from '../nodes/NodeType';
import { WorkspaceState } from '../store/workspace/types';
import Command from '../store/commands/Command';
import CMDRenameFlow from '../store/commands/cmds/CMDRenameFlow';

@Component
export default class FlowMenu extends Vue {
    @State('flows') flows!: FlowsState
    @State('selection') selectionStore!: SelectionState;
    @State('workspace') workspace!: WorkspaceState;
    @Action('DoCMD', { namespace: 'commands' }) doCMD!: (cmd: Command) => void

    @Prop({default:''})
    flowGUID!: string

    private renaming = false
    private renamingName = ''

    onFinishRename(){
        let tempStr = this.flows.flows[this.flowGUID].title
        if(tempStr != null && tempStr != this.renamingName){
            this.doCMD(new CMDRenameFlow(this.flowGUID, this.renamingName))
        }
        this.renaming = false
    }

    onClickItem(item: string){
        let tempStr: string | null = ''
        switch (item) {
            case 'rename':
                console.log(`Menu: Rename Flow #${this.flowGUID}`)
                this.renamingName = this.flows.flows[this.flowGUID].title
                this.renaming = true
                // tempStr = window.prompt(`What would you like to name flow ${this.flowGUID}`, this.flows.flows[this.flowGUID].title)
                // if(tempStr == null || tempStr == this.flows.flows[this.flowGUID].title){
                //     console.log('Rename canceled')
                // } else {
                //     this.doCMD(new CMDRenameFlow("4bc08543-15b3-4b5a-bfaf-fda8396181da", tempStr))
                // }
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
