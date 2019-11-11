// profile/actions.ts
import { ActionTree } from 'vuex';
import { SelectionState } from './types';
import { RootState } from '../types';

export interface ActionStartDrag {
    /** Starter's GUID */
    source: string
    /** Starting MousePos */
    startX: number
    /** Starting MousePos */
    startY: number
}
export interface ActionStopDrag {
    /** Ending MousePos */
    endX: number
    /** Ending MousePos */
    endY: number
    /** Should the drag be considered valid */
    commitMove: boolean
}
export interface ActionUpdateDrag {
    /** Current Calculated Grid Move */
    gridX: number
    /** Current Calculated Grid Move */
    gridY: number
}

export const actions: ActionTree<SelectionState, RootState> = {
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
    setSelected({ commit }, selectedGUIDs) {
        commit('clearSelection')
        commit('clearDragging')
        commit('setSelection', selectedGUIDs)
    },
    startDrag({ commit, state }, {source, startX, startY}: ActionStartDrag) {
        commit('clearDragging')
        if(state.selectedNodes.length == 0){
            commit('setSelection', source)
        }
        commit('startDrag', {x: startX, y: startY})
    },
    updateDrag({ commit, state }, {gridX, gridY}: ActionUpdateDrag) {
        commit('updateDrag', {x: gridX, y: gridY})
    },
    stopDrag({ commit, state }, {commitMove, endX, endY}: ActionStopDrag) {
        if(commitMove){
            commit('moveSelected')
        }
        commit('stopDrag', {x: endX, y: endX})
        commit('clearDragging')
    }
};