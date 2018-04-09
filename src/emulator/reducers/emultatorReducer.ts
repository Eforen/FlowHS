import { Reducer } from 'redux';
import { EmulatorState } from '../state/emulatorState';
import { actionTypes } from '../actions/actionTypes';

export const EmulatorReducer: Reducer<EmulatorState> = (state, action) => {
    switch (action.type) {
        case actionTypes.SIM_STEP:

            break
        default:
            break
    }
}