// nodes/index.ts

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SimulationState } from './types';
import { RootState } from '../types';

export const state: () => SimulationState = () => ( {
    nodes: [],
})

const namespaced: boolean = true;

export const simulation: Module<SimulationState, RootState> = {
    namespaced,
    state: state(),
    getters,
    actions,
    mutations
};