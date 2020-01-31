// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { SelectionState } from './types';
import { start } from 'repl';
import { selection } from '.';

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
    unsetSelection(state, payload: string[]){
        state.selected = state.selected.filter(selection => payload.includes(selection) == false)
    },
    setSelection(state, payload: string[]){
        state.selected = payload
    },
    clearSelection(state){
        state.selected = []
    },
    clearDragging(state){
        state.draggingNode = false
        state.dragOffsetX = 0
        state.dragOffsetY = 0
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
        state.dragOffsetX = 0
        state.dragOffsetY = 0
        state.dragOffsetGridX = 0
        state.dragOffsetGridY = 0
    },
    startDragConnection(state, {x, y, fromOutput, node, nodePort}: {x: number, y: number, fromOutput: boolean, node: string, nodePort: number}){
        state.draggingNode = false
        state.draggingConnection = true
        state.draggingConnectionFromOutput = fromOutput
        state.draggingConnectionNode = node
        state.draggingConnectionNodePort = nodePort
        state.mouseStartX = x
        state.mouseStartY = y
        state.dragOffsetX = 0
        state.dragOffsetY = 0
        state.dragOffsetGridX = 0
        state.dragOffsetGridY = 0
    },
    updateDrag(state, {x, y, gridX, gridY}: {x: number, y: number, gridX: number, gridY: number}){
        state.dragOffsetX = x
        state.dragOffsetY = y
        state.dragOffsetGridX = gridX
        state.dragOffsetGridY = gridY
    },
    stopDrag(state, {x, y}: {x: number, y: number, gridX: number, gridY: number}){
        state.draggingNode = false
        state.draggingConnection = false
    },
    moveSelected(state){
    },
};