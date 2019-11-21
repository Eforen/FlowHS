import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { FlowActionMoveNode } from '@/store/flows/actions';
import { Node } from '@/store/flows/types';

export default class CMDMoveNode extends Command {
    constructor(private nodeID: string, private x: number, private y: number, private nudge: boolean = true){
        super()
    }
    private oldX = 0
    private oldY = 0

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        const node = state.flows.nodes[this.nodeID]
        this.oldX = node.x
        this.oldY = node.y

        if(this.nudge){
            dispatch('flows/moveNode', {node: this.nodeID, x: this.oldX + this.x, y: this.oldY + this.y} as FlowActionMoveNode, {root:true})
        } else {
            dispatch('flows/moveNode', {node: this.nodeID, x: this.x, y: this.y} as FlowActionMoveNode, {root:true})
        }
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {

        // if(this.nudge){
        //     const node = state.flows.nodes[this.nodeID]
        //     const preMoveX = node.x
        //     const preMoveY = node.y
        //     dispatch('flows/moveNode', {node: this.nodeID, x: preMoveX - this.x, y: preMoveY - this.y} as FlowActionMoveNode, {root:true})
        // } else {
            dispatch('flows/moveNode', {node: this.nodeID, x: this.oldX, y: this.oldY} as FlowActionMoveNode, {root:true})
        // }
    }

    clone(): CMDMoveNode {
        return new CMDMoveNode(this.nodeID, this.x, this.y, this.nudge)
    }
}