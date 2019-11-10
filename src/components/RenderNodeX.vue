<template>
    <RenderNode :x="getNode.x" :y="getNode.y" :title="getNode.title" :error="getNode.error" :changed="getNode.changed" :selected="getNode.selected" :inputs="getNode.inputs" :outputs="getNode.outputs" :icon="getNode.icon" :button="getNode.button"/>
</template>

<style lang="css" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
import RenderNode from './RenderNode.vue';
import { Component, Prop } from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import { Node as NodeObj } from '../store/flows/types';

@Component({
  components: {
     RenderNode,
  } 
})
export default class RenderNodeX extends Vue {
  
    @Getter('nodeByID', { namespace: 'flows' }) nodeByID!: (id: string)  => NodeObj | undefined

    get getNode(): NodeObj { return {...this.defaults, guid: this.guid,...this.nodeByID(this.guid)}}

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
    } as NodeObj)})
    defaults!: NodeObj

    // closeWindow() {
    //   ipcRenderer.sendSync("closeWindow", "main")
    // }
}
</script>
