// nodes/index.ts

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CommandsState } from './types';
import { RootState } from '../types';

export const state: () => CommandsState = () => ({
    historyCount: 20,
    history: [],
    redo: []
})

const namespaced: boolean = true;

export const commands: Module<CommandsState, RootState> = {
    namespaced,
    state: state(),
    getters,
    actions,
    mutations
};