import { FullCombinedRootState } from '../types';
import { Dispatch } from 'vuex';

export default abstract class Command {
    abstract shortDesc(): string
    abstract exe(dispatch: Dispatch, state: FullCombinedRootState): void
    abstract undo(dispatch: Dispatch, state: FullCombinedRootState): void
    abstract clone(): Command
    abstract canMerge(that: Command): Boolean
    abstract merge(that: Command): Command
}