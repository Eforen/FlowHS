// profile/actions.ts
import { ActionTree } from 'vuex';
import { SelectionState } from './types';
import { RootState } from '../types';

// export interface ActionStartDrag {
//     /** Starter's GUID */
//     source: string
//     /** Starting MousePos */
//     startX: number
//     /** Starting MousePos */
//     startY: number
// }
// export interface ActionStopDrag {
//     /** Ending MousePos */
//     endX: number
//     /** Ending MousePos */
//     endY: number
//     /** Should the drag be considered valid */
//     commitMove: boolean
// }
// export interface ActionUpdateDrag {
//     /** Current Calculated Grid Move */
//     gridX: number
//     /** Current Calculated Grid Move */
//     gridY: number
// }

export const actions: ActionTree<SelectionState, RootState> = {
};