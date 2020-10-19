// profile/actions.ts
import { ActionTree, Dispatch } from 'vuex';
import { NotificationState, Notification } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';
import CMDMoveNode from '../commands/cmds/CMDMoveNode';
import CMDConnectNodes from '../commands/cmds/CMDConnectNodes';
import uuid from 'uuid';

export interface ActionReturnCreateNotificationTimeout {
        timeout: number 
        notification: Notification
}
export interface ActionReturnCreateNotification {
    id: string
    timeout: Promise<ActionReturnCreateNotificationTimeout>
}
export const CreateNotification: (dispatch: Dispatch, notification: Notification) => Promise<string> = async (dispatch, notification) => {
    const r:ActionReturnCreateNotification = await dispatch('notification/createNotificaion', notification, {root: true});
    return r.id
}

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
    createNotificaion({ commit , dispatch}, notification: Notification): Promise<ActionReturnCreateNotification> {
        if(notification.id == undefined) {
            notification.id = uuid.v4()
        }
        commit('addNotification', notification)
        //console.log('wtf')
        const id = notification.id
        return new Promise<ActionReturnCreateNotification>(resolve =>{
            return resolve({
                id, 
                timeout: new Promise<ActionReturnCreateNotificationTimeout>((tResolve, tReject) =>{
                    if(notification.timeout){
                        let timeout = notification.timeout
                        setTimeout(()=>{
                            commit('removeNotification', notification.id)
                            return tResolve({timeout, notification})
                        }, notification.timeout)
                    } else 
                    return tResolve({timeout: 0, notification})
                })
            })
        })
    },
    removeNotificaion({ commit, state }, id: string) {
        commit('removeNotification', id)
    }
};