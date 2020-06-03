import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { FlowActionMoveNode, FlowActionRenameFlow } from '@/store/flows/actions';
import { Node } from '@/store/flows/types';

export default class CMDRenameFlow extends Command {
    constructor(private flowID: string, private newName: string){
        super()
    }
    private oldName = 'NotCached'
    
    shortDesc(): string {
        return `Rename flow ${this.flowID} to ${this.newName}` 
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        this.oldName = state.flows.flows[this.flowID].title
        
        dispatch('flows/renameFlow', {flowID: this.flowID, newName: this.newName} as FlowActionRenameFlow, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        dispatch('flows/renameFlow', {flowID: this.flowID, newName: this.oldName} as FlowActionRenameFlow, {root:true})
    }

    clone(): CMDRenameFlow {
        return this;
    }

    canMerge(that: CMDRenameFlow): boolean {
        return false
    }

    merge(that: CMDRenameFlow): CMDRenameFlow {
        return this
    }
}