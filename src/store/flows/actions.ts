// profile/actions.ts
import { ActionTree } from 'vuex';
import { FlowsState, Node, Flow, Connection } from './types';
import { RootState } from '../types';
import { ObjectCount, ObjectFind } from '@/util/ObjectDictionary';

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
    //TODO: need to make the createNodeInSelectedFlow
    createNodeInSelectedFlow({ commit }, node: Node) {
        //commit('setNode', node)
        //commit('addNodeToFlow', {flow: flowID, node: node.guid})
        throw new Error("Method not implemented.");
    },
    createNodeInFlow({ commit }, {flowID, node}: {flowID: string, node: Node}) {
        commit('setNode', node)
        commit('addNodeToFlow', {flow: flowID, node: node.args.guid})
    },
    moveNode({ commit }, {node, x, y}: FlowActionMoveNode) {
        commit('setNodePos', {node, x, y})
    },
    //TODO: need to make the createNodeInSelectedFlow
    deleteNode({ commit }, nodeID: string) {
        commit('removeNode', nodeID)
        //commit('addNodeToFlow', {flow: flowID, node: node.guid})
        //throw new Error("Method not implemented.");
    },
    createConnection({ commit, rootState }, {conGUID, fromID, fromPort, toID, toPort}: {conGUID: string, fromID: string, fromPort: number, toID: string, toPort: number}) {
        if(ObjectCount(rootState.flows.connections, (con: Connection, guid) => (conGUID == guid || (fromID == con.fromID && fromPort == con.fromPort && toID == con.toID && toPort == con.toPort) ? 1 : 0)) > 0){
            // Already exists
            console.warn('createConnection was called but connection already exists.')
            return //Bail out and don't do anything
        }
        commit('setConnection', {conGUID, fromID, fromPort, toID, toPort})
    },
    deleteConnection({ commit, rootState }, conGUID:string) {
        console.log("Debug: deleteConnection")
        commit('unsetConnection', conGUID)
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