// index.ts
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState, FullCombinedRootState } from './types';
import { flows, state as flowsState } from './flows/index';
import { selection, state as selectionState } from './selection/index';
import { workspace, state as workspaceState } from './workspace/index';
import { commands, state as commandsState } from './commands/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0', // a simple property
        flows: flowsState,
        selection: selectionState,
        workspace: workspaceState,
        commands: commandsState
    },
    modules: {
        commands,
        flows,
        selection,
        workspace
    }
};

export default new Vuex.Store<RootState>(store);