// profile/actions.ts
import { ActionTree } from 'vuex';
import { FlowsState, Node, Flow } from './types';
import { RootState } from '../types';

export interface FlowActionMoveNode{
    node: string,
    x: number,
    y: number
}

export const actions: ActionTree<FlowsState, RootState> = {
    connectToEmulator({ commit }) {
        
    },
    loadFlow({ commit }) {
        
    }, 
    loadClose({ commit }) {
        
    },
    createFlow({ commit }, flow: Flow) {
        commit('setFlow', flow)
    },
    createNodeInFlow({ commit }, {flowID, node}: {flowID: string, node: Node}) {
        commit('setNode', node)
        commit('addNodeToFlow', {flow: flowID, node: node.guid})
    },
    moveNode({ commit }, {node, x, y}: FlowActionMoveNode) {
        commit('setNodePos', {node, x, y})
    },
    // fetchData({ commit }): any {
    //     axios({
    //         url: 'https://....'
    //     }).then((response) => {
    //         const payload: User = response && response.data;
    //         commit('profileLoaded', payload);
    //     }, (error) => {
    //         console.log(error);
    //         commit('profileError');
    //     });
    // }
};