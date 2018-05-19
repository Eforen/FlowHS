import { Reducer } from 'redux';
import { EditorState, EditorStateDefault } from '../state/editorState';
import { editorActionTypes } from '../actions/actionTypes';
import { EmulatorState } from '../../emulator/state/emulatorState';
import { MoveType } from '../state/MoveState';
import { EditorNodeState } from '../state/EditorNodeState';
import { IActionNodeCreate } from '../actions/nodeCreate';
import { createBasic } from '../../emulator/Builtin/BasicLogic';
import { IActionNodeConnect } from '../actions/nodeConnect';
import { NodeState } from '../../emulator/state/nodeState';

export const NodeReducer: Reducer<EditorState> = (state, action: IActionNodeCreate | IActionNodeConnect) => {
    if (state == undefined) state = EditorStateDefault

    switch (action.type) {
        case editorActionTypes.NODE_CREATE:
            action = action as IActionNodeCreate
            return { ...state, 
                nextNodeID: (state.nextNodeID + 1),
                nodes: [...state.nodes.slice(0, state.nextNodeID), { x: action.pos.x, y: action.pos.y}, ...state.nodes.slice(state.nextNodeID + 1)],
                emulator: {
                    ...state.emulator,
                    nodes: [
                        ...state.emulator.nodes.slice(0, state.nextNodeID), 
                        createBasic(state.nextNodeID, action.logic), 
                        ...state.emulator.nodes.slice(state.nextNodeID)
                    ],
                    updated: [
                        ...state.emulator.updated.slice(0, state.nextNodeID),
                        true,
                        ...state.emulator.updated.slice(state.nextNodeID)
                    ]
                }
            }
        case editorActionTypes.NODE_CONNECT:
            action = action as IActionNodeConnect
            //console.log(state.emulator.nodes)
            return {
                ...state, 
                emulator: {
                    ...state.emulator,
                    nodes: state.emulator.nodes.map((node: NodeState) => {
                        action = action as IActionNodeConnect
                        
                        // Start of is Input
                        if (node.ID == action.input.NodeID) {
                            return {
                                ...node,
                                inputs: node.inputs.map((input, index) => {
                                    action = action as IActionNodeConnect
                                    if (index == action.input.Pin){
                                        return {
                                            ...input,
                                            connection: action.output //sets it to the output node because inputs may only have one connection
                                        }
                                    }
                                    return input
                                }),
                                changed: true
                            }
                        }
                        // End of is Input

                        // Start of is Output
                        if (node.ID == action.output.NodeID) {
                            return {
                                ...node,
                                outputs: node.outputs.map((output, index) => {
                                    action = action as IActionNodeConnect
                                    if (index == action.output.Pin) {
                                        if (output.connections.reduce<boolean>((last, con) => {
                                            if (last === true) return true
                                            action = action as IActionNodeConnect
                                            return con.NodeID == action.input.NodeID && con.Pin == action.input.Pin
                                        }, false)) return output
                                        return {
                                            ...output,
                                            connections: [...output.connections, action.input] //sets it to the output node because inputs may only have one connection
                                        }
                                    }
                                    return output
                                }),
                                changed: true
                            }
                        }
                        // End of is Output

                        return node
                    }),
                    updated: Object.assign([...state.emulator.updated], { [action.input.NodeID]: true, [action.output.NodeID]: true })
                }
            }
        default:
            return state
    }
}