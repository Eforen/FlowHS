import { IAction, editorActionTypes } from './actionTypes';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { emulatorActionTypes } from '../../emulator/actions/actionTypes';
import { IConnectionState } from '../../emulator/state/ConnectionState';


export interface IActionNodeConnect extends IAction {
    type: editorActionTypes
    output: IConnectionState
    input: IConnectionState
}


export const makeActionNodeConnect: (outputNode: number, outputPin: number, inputNode: number, inputPin: number) => IActionNodeConnect = (outputNode, outputPin, inputNode, inputPin) => {
    return {
        type: editorActionTypes.NODE_CONNECT,
        output: { NodeID: outputNode, Pin: outputPin},
        input: { NodeID: inputNode, Pin: inputPin }
    }
}