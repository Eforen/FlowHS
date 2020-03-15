// profile/actions.ts
import { ActionTree } from 'vuex';
import { NotificationState, Notification } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';
import CMDMoveNode from '../commands/cmds/CMDMoveNode';
import CMDConnectNodes from '../commands/cmds/CMDConnectNodes';
import uuid from 'uuid';

export const actions: ActionTree<NotificationState, RootState> = {
    // connectToEmulator({ commit }) {
        
    // },
    // loadFlow({ commit }) {
        
    // }, 
    // loadClose({ commit }) {
        
    // },
    // createFlow({ commit }, flow: Flow) {
    //     commit('setFlow', flow)
    // },
    // createNodeInFlow({ commit }, {flowID, node}: {flowID: string, node: Node}) {
    //     commit('setNode', node)
    //     commit('addNodeToFlow', {flow: flowID, node: node.guid})
    // },
    createNotificaion({ commit }, notification: Notification) {
        if(notification.id == undefined) {
            notification.id = uuid.v4()
        }
        commit('addNotification', notification)
        //console.log('wtf')
        if(notification.timeout){
            setTimeout(()=>{
                commit('removeNotification', notification.id)
            })
        }
    },
    removeNotificaion({ commit, state }, id: string) {
        commit('removeNotification', id)
    }
};