// nodes/index.ts

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { WorkspaceState } from './types';
import { RootState } from '../types';

export const state: WorkspaceState = {
    size: {
        height: 250,
        width: 250,
    },
    grid: {
        height: 20,
        width: 20,
    },
    prefrences: {
        shiftMove: 5
    }
}

const namespaced: boolean = true;

export const workspace: Module<WorkspaceState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};