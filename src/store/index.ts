// index.ts
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { flows } from './flows/index';
import { selection } from './selection/index';
import { workspace } from './workspace/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0' // a simple property
    },
    modules: {
        flows,
        selection,
        workspace
    }
};

export default new Vuex.Store<RootState>(store);