// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { SelectionState, Node, Flow } from './types';

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
};