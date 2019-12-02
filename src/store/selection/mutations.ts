// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { SelectionState } from './types';
import { start } from 'repl';

export const mutations: MutationTree<SelectionState> = {
    // setFlow(state, payload: Flow){
    //     Vue.set(state.flows, payload.guid, payload)
    // },
    // setNode(state, payload: Node){
    //     Vue.set(state.nodes, payload.guid, payload)
    // },
    // addNodeToFlow(state, payload: {flow: string, node: string}){
    //     if(state.flows[payload.flow].nodes.indexOf(payload.node) == -1){
    //         Vue.set(state.flows, payload.flow, 
    //             {...state.flows[payload.flow], 
    //                 nodes: [...state.flows[payload.flow].nodes, payload.node]
    //             }
    //         )
    //     }
    // },
    // addConToFlow(state, payload: {flow: string, connection: string}){
    //     if(state.flows[payload.flow].connections.indexOf(payload.connection) == -1){
    //         Vue.set(state.flows, payload.flow, 
    //             {...state.flows[payload.flow], 
    //                 connections: [...state.flows[payload.flow].connections, payload.connection]
    //             }
    //         )
    //     }
    // }
    setSelection(state, payload: string[]){
        state.selectedNodes = payload
    },
    clearSelection(state){
        state.selectedNodes = []
    },
    clearDragging(state){
        state.draggingNode = false
        state.dragOffsetGridX = 0
        state.dragOffsetGridY = 0
        state.mouseStartX = 0
        state.mouseStartY = 0

        state.draggingConnection = false
        state.draggingConnectionFromOutput = false
        state.draggingConnectionNode = ''
    },
    startDragNode(state, {x, y}: {x: number, y: number}){
        state.draggingNode = true
        state.draggingConnection = false
        state.mouseStartX = x
        state.mouseStartY = y
    },
    startDragConnection(state, {x, y, fromOutput, node}: {x: number, y: number, fromOutput: boolean, node: string}){
        state.draggingNode = false
        state.draggingConnection = true
        state.draggingConnectionFromOutput = fromOutput
        state.draggingConnectionNode = node
        state.mouseStartX = x
        state.mouseStartY = y
    },
    updateDrag(state, {x, y}: {x: number, y: number}){
        state.dragOffsetGridX = x
        state.dragOffsetGridY = y
    },
    stopDrag(state, {x, y}: {x: number, y: number}){
        state.draggingNode = false
        state.draggingConnection = false
    },
    moveSelected(state){
    },
};