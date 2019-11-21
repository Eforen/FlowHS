import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { FlowActionMoveNode } from '@/store/flows/actions';
import { Node } from '@/store/flows/types';

export default class CMDGroup extends Command {
    constructor(private CMDs: Command[]){
        super()
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        for (let index = this.CMDs.length - 1; index >= 0 ; index--) {
            const cmd = this.CMDs[index];
            cmd.exe(dispatch, state)
        }
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        for (let index = 0; index < this.CMDs.length; index++) {
            const cmd = this.CMDs[index];
            cmd.undo(dispatch, state)
        }
    }

    clone(): CMDGroup {
        return new CMDGroup(this.CMDs.map(cmd => cmd.clone()))
    }
}