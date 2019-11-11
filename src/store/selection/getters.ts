// profile/getters.ts
import { GetterTree } from 'vuex';
import { SelectionState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<SelectionState, RootState> = {
    // nodeByID(state: FlowsState): (id: string) => Node | undefined {
    //     return (id) => state.nodes ? state.nodes[id] : undefined
    // },
    // nodesInFlow(state: FlowsState): (id: string) => string[] {
    //     return (id) => state.flows && state.flows[id] ? [...state.flows[id].nodes] : []
    // },
    // connectionsInFlow(state: FlowsState): (id: string) => string[] {
    //     return (id) => state.flows && state.flows[id] ? [...state.flows[id].connections] : []
    // }
};