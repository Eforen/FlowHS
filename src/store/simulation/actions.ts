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
    RemoveConnection = "SIM_REMOVE_CONNECTION"
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
    }
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
    }
};