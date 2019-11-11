// profile/actions.ts
import { ActionTree } from 'vuex';
import { SelectionState } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';

export type SelectionPayloadSetSelected = string[]
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
    setSelected({ commit }, selectedGUIDs: SelectionPayloadSetSelected) {
        commit('clearSelection')
        commit('clearDragging')
        commit('setSelection', selectedGUIDs)
    },
    startDrag({ commit, state }, {source, startX, startY}: ActionStartDrag) {
        commit('clearDragging')
        if(state.selectedNodes.length == 0 || state.selectedNodes.includes(source) == false){
            // if no selection or selection does not include drag source change selection to the source
            commit('setSelection', [source])
        }
        commit('startDrag', {x: startX, y: startY})
    },
    updateDrag({ commit, state }, {gridX, gridY}: ActionUpdateDrag) {
        console.log({x: gridX, y: gridY})
        commit('updateDrag', {x: gridX, y: gridY})
    },
    stopDrag({ dispatch, commit, state, rootState }, {commitMove, endX, endY}: ActionStopDrag) {
        if(commitMove){
            //commit('moveSelected')
            state.selectedNodes.forEach(node => {
                const nodeProps: Node = ((rootState as any).flows as FlowsState).nodes[node]
                const x = nodeProps.x + state.dragOffsetGridX
                const y = nodeProps.y + state.dragOffsetGridY
                dispatch('flows/moveNode', {node, x, y} as FlowActionMoveNode, {root:true})
            })
        }
        commit('stopDrag', {x: endX, y: endX})
        commit('clearDragging')
    }
};