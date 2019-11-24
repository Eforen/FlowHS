// profile/getters.ts
import { GetterTree } from 'vuex';
import { WorkspaceState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<WorkspaceState, RootState> = {
    // nodeByID(state: FlowsState): (id: string) => Node | undefined {
    //     return (id) => state.nodes ? state.nodes[id] : undefined
    // },
    // nodesInFlow(state: FlowsState): (id: string) => string[] {
    //     return (id) => state.flows && state.flows[id] ? [...state.flows[id].nodes] : []
    // },
    // connectionsInFlow(state: FlowsState): (id: string) => string[] {
    //     return (id) => state.flows && state.flows[id] ? [...state.flows[id].connections] : []
    // }
    loadedFlow(state: WorkspaceState): string {
        if(state.editor.selectedFlow == -1 || state.editor.loadedFlows.length == 0) return ''
        return state.editor.loadedFlows[state.editor.selectedFlow]
    },
    flowLoaded(state: WorkspaceState): boolean {
      return state.editor.loadedFlows.length > 0
    }
};