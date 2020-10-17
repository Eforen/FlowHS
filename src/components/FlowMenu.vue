<template>
    <div class="FlowMenu">
        <ol>
            <li id="rename" @click="onClickItem('rename')">Rename</li>
            <li id="save" @click="onClickItem('save')">Save</li>
            <li id="close" @click="onClickItem('close')">Close</li>
        </ol>
        <v-overlay
            v-if="renaming"
            value="overlay"
        >
            <v-container>
                <v-row>
                    <v-col cols="12">
                    <v-text-field
                        ref="renameTextField"
                        v-model="renamingName"
                        label="New Name"
                        outlined
                        @keyup.enter="onKeyPress"
                        @keyup.esc="onKeyPress"
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
import Vuetify from 'vuetify'
import { State, Action, Getter } from 'vuex-class';
//import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop } from 'vue-property-decorator'
import { ipcRenderer, remote, SaveDialogReturnValue } from 'electron'
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
    @Action('saveFlow', { namespace: 'flows' }) saveFlow!: (flowGUID: string) => void

    @Prop({default:''})
    flowGUID!: string

    private renaming = false
    private renamingName = ''

    onKeyPress(event: KeyboardEvent){
        switch (event.keyCode) {
            case 13: // Enter
                // This is enter and thus the event is to finish renaming.
                this.onFinishRename()
                break;
        
            case 27: // Esc
                // Pressing escape is to cancel
                this.renaming = false
                break;
        
            default:
                // return event
                break;
        }
    }

    onFinishRename(){
        let tempStr = this.flows.flows[this.flowGUID].title
        if(tempStr != null && tempStr != this.renamingName){
            this.doCMD(new CMDRenameFlow(this.flowGUID, this.renamingName))
        }
        this.renaming = false
    }

    async doSave() {
        // let options = {
        //     //Placeholder 1
        //     title: "FlowHS: Save Chip",
            
        //     //Placeholder 2
        //     defaultPath : this.flows.flows[this.flowGUID].filename.trim() == '' ? `${this.flows.flows[this.flowGUID].guid}.chip` : this.flows.flows[this.flowGUID].filename, //"C:\\BrainBell.png",
            
        //     //Placeholder 4
        //     buttonLabel : "Save Chip File",
            
        //     //Placeholder 3
        //     filters :[
        //         {name: 'FlowHS Chip File', extensions: ['chip']},
        //         {name: 'All Files', extensions: ['*']}
        //     ]
        // }
        
        // let r: SaveDialogReturnValue = await remote.dialog.showSaveDialog(options)
        
        // console.log(r.filePath)
        this.saveFlow(this.flowGUID)
    }

    async onClickItem(item: string){
        let tempStr: string | null = ''
        switch (item) {
            case 'rename':
                console.log(`Menu: Rename Flow #${this.flowGUID}`)
                this.renamingName = this.flows.flows[this.flowGUID].title
                this.renaming = true
                setTimeout(()=>{
                    //WARNING: Hacky cast any way to do this because the interface is not correct. This could cause a bug later should the api implementation change.
                    //(this.$refs.renameTextField as any).$el.focus()
                    console.log(this.$refs.renameTextField)
                }, 100)
                // tempStr = window.prompt(`What would you like to name flow ${this.flowGUID}`, this.flows.flows[this.flowGUID].title)
                // if(tempStr == null || tempStr == this.flows.flows[this.flowGUID].title){
                //     console.log('Rename canceled')
                // } else {
                //     this.doCMD(new CMDRenameFlow("4bc08543-15b3-4b5a-bfaf-fda8396181da", tempStr))
                // }
                break;
            case 'save':
                console.log(`Menu: Save Flow #${this.flowGUID}`)
                await this.doSave()
                // this.flows.flows[this.flowGUID].filename
                // console.log(ipcRenderer.sendSync("saveFlowFile_getPath", this.flows.flows[this.flowGUID].filename.trim() == '' ? `${this.flows.flows[this.flowGUID].guid}.chip` : this.flows.flows[this.flowGUID].filename))
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
