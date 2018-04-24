import { Action } from 'redux';
import { emulatorActionTypes } from './actionTypes';

export interface SimStepAction extends Action {

}

export const createStepAction: () => SimStepAction = () => ({
    type: emulatorActionTypes.SIM_STEP_LOGIC
})