// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { CommandsState } from './types';
import { start } from 'repl';
import Command from './Command';
//import * as _ from 'lodash';

export const mutations: MutationTree<CommandsState> = {
    addCMD(state, payload: Command){
        //Check if it can be merged and do so if it can
        if(state.history.length > 0 && state.history[state.history.length - 1].canMerge(payload)){
            Vue.set(state.history, state.history.length - 1,state.history[state.history.length - 1].merge(payload)) 
        } else{
            let clone = [...state.history]
            clone.push(payload)
            
            if(clone.length > state.historyCount){
                clone = clone.slice(clone.length - state.historyCount)
            }
            
            state.history = clone
        }
    },    
    popCMD(state){
        let clone = [...state.history]
        clone.pop()

        state.history = clone
    }
};