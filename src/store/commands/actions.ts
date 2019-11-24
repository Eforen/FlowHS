// profile/actions.ts
import { ActionTree } from 'vuex';
import { CommandsState } from './types';
import { RootState, FullCombinedRootState } from '../types';
import Command from './Command';

export const actions: ActionTree<CommandsState, RootState> = {
    DoCMD({ dispatch, commit, state, rootState }, cmd: Command) {
        cmd.exe(dispatch, rootState)
        commit('clearRedo', cmd)
        commit('addCMD', cmd)
    },
    UndoCMD({ dispatch, commit, state, rootState }) {
        rootState.commands.history[rootState.commands.history.length-1].undo(dispatch, rootState)
        commit('moveCMDtoRedo')
    },
    RedoCMD({ dispatch, commit, state, rootState }) {
        if(rootState.commands.redo.length == 0) return
        rootState.commands.redo[rootState.commands.redo.length-1].exe(dispatch, rootState)
        commit('moveCMDtoHistory')
    },
    stelthAddCMD({ dispatch, commit, state, rootState }, cmd: Command) {
        commit('addCMD', cmd)
    },
    stelthRemoveCMD({ dispatch, commit, state, rootState }) {
        commit('popCMD')
    }
};