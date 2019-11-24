// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { WorkspaceState } from './types';
import { start } from 'repl';

export const mutations: MutationTree<WorkspaceState> = {
    addFlow(state, flowID: string){
        if(state.editor.loadedFlows.includes(flowID)){
            return
        }

        if(state.editor.loadedFlows.length == 0) state.editor.selectedFlow = 0
        const clone = [...state.editor.loadedFlows]
        clone.push(flowID)
        state.editor.loadedFlows = clone
    },
    selectFlow(state, flowID: string){
        if(state.editor.loadedFlows.includes(flowID) == false){
            const clone = [...state.editor.loadedFlows]
            clone.push(flowID)
            state.editor.loadedFlows = clone
        }

        state.editor.selectedFlow = state.editor.loadedFlows.indexOf(flowID)
    },
    selectPrevFlow(state){
        state.editor.selectedFlow = state.editor.selectedFlow - 1
        if(state.editor.selectedFlow < 0) 
            state.editor.selectedFlow = state.editor.loadedFlows.length - 1
        if(state.editor.loadedFlows.length == 0)
            state.editor.selectedFlow = -1
    },
    selectNextFlow(state){
        state.editor.selectedFlow = state.editor.selectedFlow + 1
        if(state.editor.selectedFlow >= state.editor.loadedFlows.length) 
            state.editor.selectedFlow = 0
    },
};