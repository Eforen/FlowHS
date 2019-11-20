import { FullCombinedRootState } from '../types';
import { Dispatch } from 'vuex';

export default abstract class Command {
    abstract exe(dispatch: Dispatch, state: FullCombinedRootState): void
    abstract undo(dispatch: Dispatch, state: FullCombinedRootState): void
    abstract clone(): Command
}