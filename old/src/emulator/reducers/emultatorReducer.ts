import { Reducer } from 'redux';
import { EmulatorState } from '../state/emulatorState';
import { emulatorActionTypes } from '../actions/actionTypes';
import { nodeProcesser } from './nodeProcesser';

export const EmulatorReducer: Reducer<EmulatorState> = (state, action) => {
    switch (action.type) {
        case emulatorActionTypes.SIM_STEP_LOGIC:
            if (state.changed){
                let changed = false
                let changes: boolean[] = []
                return {
                    ...state,
                    nodes: state.nodes.map((node) => {
                        let newNode = nodeProcesser(node)
                        changed = changed || newNode.changed
                        if (newNode.changed) changes[newNode.ID] = true;
                        return newNode
                    }),
                    updated: changes
                }
            }
            return state
        case emulatorActionTypes.SIM_STEP_WIRES:
            if (state.updated.length > 0){
                /*let states: any[][]

                state.updated.forEach((val, index) => {
                    state.nodes[index].outputs.forEach((output) => {
                        output.connections.forEach((wire) => {})
                    })
                })*/

                let nodesChanged = false
                let newNodes = state.nodes.map((val) => {
                    let changed = false;
                    let inputs = val.inputs.map((input) => {
                        if (input.connection == undefined) return input
                        if (state.updated[input.connection.NodeID] &&
                            state.nodes[input.connection.NodeID].outputs[input.connection.Pin].value != input.value) {
                            changed = true
                            return {
                                ...input,
                                value: state.nodes[input.connection.NodeID].outputs[input.connection.Pin].value
                            }
                        }
                        return input
                    })
                    if (changed) {
                        nodesChanged = true
                        return {
                            ...val,
                            changed: true,
                            inputs: inputs
                        }
                    }
                    return val
                })

                if (nodesChanged){
                    return {
                        ...state,
                        nodes: newNodes
                    }
                }
            }
            return state
        default:
            return state
    }
}