// profile/mutations.ts
import Vue from 'vue';
import { MutationTree, Commit } from 'vuex';
import { SimulationConnection, SimulationNode, SimulationRoot, SimulationState } from './types';
import { start } from 'repl';
import { simulation } from '.';

export enum SimulationCommits {
    AddNode = "SIM_COMMITS_ADD_NODE",
    RemoveNode = "SIM_COMMITS_REMOVE_NODE",
    AddConnection = "SIM_COMMITS_ADD_CONNECTION",
    RemoveConnection = "SIM_COMMITS_REMOVE_CONNECTION",
    SetNodePin = "SIM_COMMITS_SET_NODE_PIN",
    SetConnectionState = "SIM_COMMITS_SET_CONNECTION_STATE",
}

export const MakeSimulationCommit = {
    AddNode: (commit: Commit, node: SimulationNode, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.AddNode}`, node, {root: true})
        return commit(SimulationCommits.AddNode, node)
    },
    RemoveNode: (commit: Commit, nodeGUID: string, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.RemoveNode}`, nodeGUID, {root: true})
        return commit(SimulationCommits.RemoveNode, nodeGUID)
    },
    AddConnection: (commit: Commit, connection: SimulationConnection, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.AddConnection}`, connection, {root: true})
        return commit(SimulationCommits.AddConnection, connection)
    },
    RemoveConnection: (commit: Commit, connectionGUID: string, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.RemoveConnection}`, connectionGUID, {root: true})
        return commit(SimulationCommits.RemoveConnection, connectionGUID)
    },
    SetNodePin: (commit: Commit, nodeGUID: string, output: boolean, pin: number, pinState: boolean, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.SetNodePin}`, {nodeGUID, output, pin, pinState}, {root: true})
        return commit(SimulationCommits.SetNodePin, {nodeGUID, output, pin, pinState})
    },
    SetConnectionState: (commit: Commit, connectionGUID: string, pinState: boolean, runFromRoot: boolean = false) => {
        if(runFromRoot) return commit(`${SimulationRoot}/${SimulationCommits.SetConnectionState}`, {connectionGUID, pinState}, {root: true})
        return commit(SimulationCommits.SetConnectionState, {connectionGUID, pinState})
    }
}

export const mutations: MutationTree<SimulationState> = {
    SIM_COMMITS_ADD_NODE(state, node: SimulationNode){
        Vue.set(state.nodes, node.guid, node)
    },
    SIM_COMMITS_REMOVE_NODE(state, nodeGUID: string){
        Vue.delete(state.nodes, nodeGUID)
    },
    SIM_COMMITS_ADD_CONNECTION(state, connection: SimulationConnection){
        Vue.set(state.connections, connection.guid, connection)
        if(connection.from != null) Vue.set(state.nodes[connection.from].outputGuids, connection.fromPin, connection.guid)
    },
    SIM_COMMITS_REMOVE_CONNECTION(state, connectionGUID: string){
        Vue.delete(state.connections, connectionGUID)
    },
    SIM_COMMITS_SET_NODE_PIN(state: SimulationState, {nodeGUID, output, pin, pinState}: {nodeGUID: string, output: boolean, pin: number, pinState: boolean}){
        if(output){
            state.nodes[nodeGUID].outputState[pin] = pinState
        } else {
            state.nodes[nodeGUID].inputState[pin] = pinState
        }
    },
    SIM_COMMITS_SET_CONNECTION_STATE(state: SimulationState, {connectionGUID, pinState}: {connectionGUID: string, pinState: boolean}){
        if(state.connections[connectionGUID].state[0] == pinState){
            return // It already is in the correct state
        }
        state.connections[connectionGUID].state[0] = pinState
    }
};