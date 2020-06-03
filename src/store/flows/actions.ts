// profile/actions.ts
import { ActionTree } from 'vuex';
import { FlowsState, Node, Flow, Connection } from './types';
import { RootState } from '../types';
import { ObjectCount, ObjectFind, ObjectForEach } from '@/util/ObjectDictionary';

export interface FlowActionMoveNode{
    node: string,
    x: number,
    y: number
}

export interface FlowActionRenameFlow{
    flowID: string,
    newName: string
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
    deleteNode({ commit, state }, nodeID: string) {
        let removedGuids = [nodeID]
    
        // Get all connections that connect to this node and remove them
        ObjectForEach(state.connections, (key, con: Connection) => {
            if(con.fromID == nodeID || con.toID == nodeID){
                removedGuids.push(con.guid)
            }
        })
        commit('removeNode', nodeID)
        commit('selection/unsetSelection', removedGuids, {root: true})
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
        //console.log("Debug: deleteConnection")
        commit('unsetConnection', conGUID)
        commit('selection/unsetSelection', [conGUID], {root: true})
    },
    renameFlow({ commit, rootState }, payload:FlowActionRenameFlow) {
        //console.log("Debug: deleteConnection")
        //console.log(`Rename Action: ${payload.newName}`)
        commit('renameFlow', payload)
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