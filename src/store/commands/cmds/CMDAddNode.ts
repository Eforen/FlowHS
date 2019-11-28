import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node } from '@/store/flows/types';

export default class CMDAddNode extends Command {
    constructor(private node: Node, private flow: string = "current"){
        super()
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        if(this.flow == "current"){
            dispatch('flows/createNodeInSelectedFlow', this.node, {root:true})
        } else{
            dispatch('flows/createNodeInFlow', {flowID: this.flow, node: this.node} as {flowID: string, node: Node}, {root:true})
        }
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        dispatch('flows/deleteNode', this.node.args.guid, {root:true})
    }

    clone(): CMDAddNode {
        return new CMDAddNode(this.node, this.flow)
    }

    canMerge(other: CMDAddNode): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}