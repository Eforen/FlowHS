// profile/getters.ts
import { GetterTree } from 'vuex';
import { FlowsState, Node } from './types';
import { RootState } from '../types';

export const getters: GetterTree<FlowsState, RootState> = {
    fullName(state): string {
        // const { nodes } = state;
        // const firstName = (user && user.firstName) || '';
        // const lastName = (user && user.lastName) || '';
        // return `${firstName} ${lastName}`;
        return ''
    },
    nodeByID(state: FlowsState): (id: string) => Node | undefined {
        return (id) => state.nodes ? state.nodes[id] : undefined
    },
    nodesInFlow(state: FlowsState): (id: string) => string[] {
        return (id) => state.flows && state.flows[id] ? [...state.flows[id].nodes] : []
    },
    connectionsInFlow(state: FlowsState): (id: string) => string[] {
        return (id) => state.flows && state.flows[id] ? [...state.flows[id].connections] : []
    }
};