// profile/actions.ts
import { ActionTree } from 'vuex';
import { SimulationState } from './types';
import { RootState } from '../types';
import { FlowActionMoveNode } from '../flows/actions';
import { FlowsState, Node } from '../flows/types';
import CMDMoveNode from '../commands/cmds/CMDMoveNode';
import CMDConnectNodes from '../commands/cmds/CMDConnectNodes';

export interface ActionUpdateDrag {
    /** Current Mouse Offset */
    x: number
    /** Current Mouse Offset */
    y: number
}

export const actions: ActionTree<SimulationState, RootState> = {
    updateDrag({ commit, state, rootState }, {x, y}: ActionUpdateDrag) {
        //commit('updateDrag', {x: offsetX, y: offsetY, gridX, gridY})
    }
};