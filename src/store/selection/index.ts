// nodes/index.ts

import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SelectionState } from './types';
import { RootState } from '../types';

export const state: SelectionState = {
    selectedNodes: [],
    dragging: false,
    dragOffsetGridX: 0,
    dragOffsetGridY: 0,
    mouseStartX: 0,
    mouseStartY: 0
};

const namespaced: boolean = true;

export const selection: Module<SelectionState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};