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
    RemoveConnection = "SIM_COMMITS_REMOVE_CONNECTION"
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
    },
    SIM_COMMITS_REMOVE_CONNECTION(state, connectionGUID: string){
        Vue.delete(state.connections, connectionGUID)
    },
};