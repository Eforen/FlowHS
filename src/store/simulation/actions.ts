// profile/actions.ts
import { ActionTree, Dispatch } from 'vuex';
import { SimulationConnection, SimulationNode, SimulationRoot, SimulationState } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';
import CMDMoveNode from '../commands/cmds/CMDMoveNode';
import CMDConnectNodes from '../commands/cmds/CMDConnectNodes';
import { MakeSimulationCommit } from './mutations';

export enum SimulationActions {
    AddNode = "SIM_ADD_NODE",
    RemoveNode = "SIM_REMOVE_NODE",
    AddConnection = "SIM_ADD_CONNECTION",
    RemoveConnection = "SIM_REMOVE_CONNECTION",
    SetNodePin = "SIM_SET_NODE_PIN_STATE",
    SetConnectionState = "SIM_SET_CONNECTION_STATE",
    UpdateNode = "SIM_UPDATE_NODE"
}

export const MakeSimulationActions = {
    AddNode: (dispatch: Dispatch, node: SimulationNode, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.AddNode}`, node, {root: true})
        return dispatch(SimulationActions.AddNode, node)
    },
    RemoveNode: (dispatch: Dispatch, nodeGUID: string, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.RemoveNode}`, nodeGUID, {root: true})
        return dispatch(SimulationActions.RemoveNode, nodeGUID)
    },
    AddConnection: (dispatch: Dispatch, connection: SimulationConnection, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.AddConnection}`, connection, {root: true})
        return dispatch(SimulationActions.AddConnection, connection)
    },
    RemoveConnection: (dispatch: Dispatch, connectionGUID: string, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.RemoveConnection}`, connectionGUID, {root: true})
        return dispatch(SimulationActions.RemoveConnection, connectionGUID)
    },
    SetNodeState: (dispatch: Dispatch, nodeGUID: string, output: boolean, pin: number, pinState: boolean, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.SetNodePin}`, {nodeGUID, output, pin, pinState}, {root: true})
        return dispatch(SimulationActions.SetNodePin, {nodeGUID, output, pin, pinState})
    },
    SetConnectionState: (dispatch: Dispatch, connectionGUID: string, pinState: boolean, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.SetConnectionState}`, {connectionGUID, pinState}, {root: true})
        return dispatch(SimulationActions.SetConnectionState, {connectionGUID, pinState})
    },
    Update: (dispatch: Dispatch, nodeGUID: string, runFromRoot: boolean = true) => {
        if(runFromRoot) return dispatch(`${SimulationRoot}/${SimulationActions.UpdateNode}`, {nodeGUID}, {root: true})
        return dispatch(SimulationActions.UpdateNode, {nodeGUID})
    },
}

export const actions: ActionTree<SimulationState, RootState> = {
    SIM_ADD_NODE({ commit, state }, node: SimulationNode) {
        MakeSimulationCommit.AddNode(commit, node)
    },
    SIM_REMOVE_NODE({ commit, state }, nodeGUID: string) {
        MakeSimulationCommit.RemoveNode(commit, nodeGUID)
    },
    SIM_ADD_CONNECTION({ commit, state }, connection: SimulationConnection) {
        MakeSimulationCommit.AddConnection(commit, connection)
    },
    SIM_REMOVE_CONNECTION({ commit, state }, connectionGUID: string) {
        MakeSimulationCommit.RemoveConnection(commit, connectionGUID)
    },
    SIM_SET_NODE_PIN_STATE({ commit, state, dispatch }, {nodeGUID, output, pin, pinState}: {nodeGUID: string, output: boolean, pin: number, pinState: boolean}){
        let oldState = false
        if(output){
            oldState = state.nodes[nodeGUID].outputState[pin]
        } else {
            oldState = state.nodes[nodeGUID].inputState[pin]
        }
        MakeSimulationCommit.SetNodePin(commit, nodeGUID, output, pin, pinState)

        if(output){
            const connectionGuid = state.nodes[nodeGUID].outputGuids[pin]
            if(connectionGuid!=null){
                MakeSimulationActions.SetConnectionState(dispatch, connectionGuid, pinState, false)
            }
        } else {
            MakeSimulationActions.Update(dispatch, nodeGUID, false)
        }
    },
    SIM_SET_CONNECTION_STATE({ commit, state, dispatch }, {connectionGUID, pinState}: {connectionGUID: string, pinState: boolean}){
        const connection = state.connections[connectionGUID]
        if(connection.state[0] == pinState) return
        MakeSimulationCommit.SetConnectionState(commit, connectionGUID, pinState)
        if(connection.to != null) {
            MakeSimulationActions.SetNodeState(dispatch, connection.to, false, connection.toPin, pinState)
        }
    }
};