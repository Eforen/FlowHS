import { Action } from 'redux';
import { actionTypes } from './actionTypes';

export interface SimStepAction extends Action {

}

export const createStepAction: () => SimStepAction = () => ({
    type: actionTypes.SIM_STEP
})