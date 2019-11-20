// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { CommandsState } from './types';
import { start } from 'repl';
import Command from './Command';
//import * as _ from 'lodash';

export const mutations: MutationTree<CommandsState> = {
    addCMD(state, payload: Command){
        let clone = [...state.history]
        clone.push(payload)
        
        if(clone.length > state.historyCount){
            clone = clone.slice(clone.length - state.historyCount)
        }

        state.history = clone
    },    
    popCMD(state){
        let clone = [...state.history]
        clone.pop()

        state.history = clone
    }
};