// profile/actions.ts
import { ActionTree } from 'vuex';
import { SelectionState } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';
import CMDMoveNode from '../commands/cmds/CMDMoveNode';

export type SelectionPayloadSetSelected = string[]
export type SelectionPayloadAddSelected = string[]
export interface ActionStartDragNode {
    /** Starter's GUID */
    source: string
    /** Starting MousePos */
    startX: number
    /** Starting MousePos */
    startY: number
}
export interface ActionStartDragConnection {
    /** Starter's GUID */
    source: string
    /** Starting MousePos */
    startX: number
    /** Starting MousePos */
    startY: number
    /** Is it an output that started the drag */
    output: boolean
    /** what port was the drag started at */
    port: number
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
    /** Current Mouse Offset */
    x: number
    /** Current Mouse Offset */
    y: number
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
    addSelected({ commit, state }, selectedGUIDs: SelectionPayloadAddSelected) {
        commit('clearDragging')
        commit('setSelection', [...state.selectedNodes, ...selectedGUIDs])
    },
    startDragNode({ commit, state }, {source, startX, startY}: ActionStartDragNode) {
        commit('clearDragging')
        if(state.selectedNodes.length == 0 || state.selectedNodes.includes(source) == false){
            // if no selection or selection does not include drag source change selection to the source
            commit('setSelection', [source])
        }
        commit('startDragNode', {x: startX, y: startY})
    },
    startDragConnection({ commit, state }, {source, startX, startY, output, port}: ActionStartDragConnection) {
        commit('clearDragging')
        // if(state.selectedNodes.length == 0 || state.selectedNodes.includes(source) == false){
        //     // if no selection or selection does not include drag source change selection to the source
        //     commit('setSelection', [source])
        // }
        commit('startDragConnection', {x: startX, y: startY, fromOutput: output, node:source, nodePort:port})
    },
    updateDrag({ commit, state, rootState }, {x, y}: ActionUpdateDrag) {
        //const gridX = Math.round((e.screenX - state.mouseStartX) / this.workspace.grid.width)
        //const gridY = Math.round((e.screenY - state.mouseStartY) / this.workspace.grid.height)
        const offsetX = (x - state.mouseStartX)
        const offsetY = (y - state.mouseStartY)
        const gridX = Math.round(offsetX / rootState.workspace.grid.width)
        const gridY = Math.round(offsetY / rootState.workspace.grid.height)
        //console.log({x: offsetX, y: offsetY, gridX, gridY})
        commit('updateDrag', {x: offsetX, y: offsetY, gridX, gridY})
    },
    stopDrag({ dispatch, commit, state, rootState }, {commitMove, endX, endY}: ActionStopDrag) {
        const gridX = Math.round(endX / rootState.workspace.grid.width)
        const gridY = Math.round(endY / rootState.workspace.grid.height)
        if(commitMove){
            //commit('moveSelected')
            if(state.draggingNode){
                state.selectedNodes.forEach(node => {
                    const nodeProps: Node = ((rootState as any).flows as FlowsState).nodes[node]
                    const x = nodeProps.args.x + state.dragOffsetGridX
                    const y = nodeProps.args.y + state.dragOffsetGridY
                    dispatch('commands/DoCMD', new CMDMoveNode(node, gridX, gridY, false), {root:true})
                    //dispatch('flows/moveNode', {node, x, y} as FlowActionMoveNode, {root:true})
                    //console.log()
                })
            }
        }
        commit('stopDrag', {x: endX, y: endY, gridX, gridY})
        commit('clearDragging')
    }
};