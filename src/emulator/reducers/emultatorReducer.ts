import { Reducer } from 'redux';
import { EmulatorState } from '../state/emulatorState';
import { actionTypes } from '../actions/actionTypes';
import { nodeProcesser } from './nodeProcesser';

export const EmulatorReducer: Reducer<EmulatorState> = (state, action) => {
    switch (action.type) {
        case actionTypes.SIM_STEP_LOGIC:
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
        case actionTypes.SIM_STEP_WIRES:
            if (state.updated.length > 0){
                state.updated.forEach((val, index) => {
                    //return
                })
            }
            return state
        default:
            return state
    }
}