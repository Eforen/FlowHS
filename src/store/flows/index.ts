// nodes/index.ts

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { FlowsState, NodeDictionary } from './types';
import { RootState } from '../types';

export const state: () => FlowsState = () => ({
    connectedToBackend: false,
    nodes: {},
    flows: {},
    connections: {}
})

const namespaced: boolean = true;

export const flows: Module<FlowsState, RootState> = {
    namespaced,
    state: state(),
    getters,
    actions,
    mutations
};

/*
const state = {
    
}

const mutations = {
}

const actions = {
}

const modules = {
}

export default {
    state,
    mutations,
    actions,
    modules
}
*/