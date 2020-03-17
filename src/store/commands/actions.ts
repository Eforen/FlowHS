// profile/actions.ts
import { ActionTree } from 'vuex';
import { CommandsState } from './types';
import { RootState, FullCombinedRootState } from '../types';
import Command from './Command';
import { Notification } from '../notification/types';

const UNDO_REDO_TIMEOUT=2000

export const actions: ActionTree<CommandsState, RootState> = {
    DoCMD({ dispatch, commit, state, rootState }, cmd: Command) {
        cmd.exe(dispatch, rootState)
        commit('clearRedo', cmd)
        commit('addCMD', cmd)
    },
    UndoCMD({ dispatch, commit, state, rootState }) {
        rootState.commands.history[rootState.commands.history.length-1].undo(dispatch, rootState)
        commit('moveCMDtoRedo')
        dispatch('notification/createNotificaion', {text: "Undo", timeout: UNDO_REDO_TIMEOUT, closable:true, border:"left", icon:"mdi-undo"} as Notification, {root:true})
    },
    RedoCMD({ dispatch, commit, state, rootState }) {
        if(rootState.commands.redo.length == 0) return
        rootState.commands.redo[rootState.commands.redo.length-1].exe(dispatch, rootState)
        commit('moveCMDtoHistory')
        dispatch('notification/createNotificaion', {text: "Redo", timeout: UNDO_REDO_TIMEOUT, closable:true, border:"left", icon:"mdi-redo"}, {root:true})
    },
    stelthAddCMD({ dispatch, commit, state, rootState }, cmd: Command) {
        commit('addCMD', cmd)
    },
    stelthRemoveCMD({ dispatch, commit, state, rootState }) {
        commit('popCMD')
    }
};