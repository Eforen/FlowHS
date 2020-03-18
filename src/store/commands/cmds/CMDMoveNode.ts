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
    
    shortDesc(): string {
        return `Move Node (${this.x}, ${this.y})`
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        const node = state.flows.nodes[this.nodeID]
        this.oldX = node.args.x
        this.oldY = node.args.y

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

    canMerge(that: CMDMoveNode): boolean {
        if(that instanceof CMDMoveNode == false) return false
        if(this.nudge){
            if(this.nodeID != that.nodeID) return false
            // if(
            //     ((this.x > 0)==(that.x > 0) || this.x == 0 || that.x) && ((this.y > 0)==(that.y > 0) || this.y == 0 || that.y) //Both on the same side
            //     ){
            //         return true
            // }
            return true
        } else {
            return false
        }
        // return false
    }

    merge(that: CMDMoveNode): CMDMoveNode {
        let newMove =  new CMDMoveNode(this.nodeID, this.x + that.x, this.y + that.y)
        newMove.oldX = this.oldX
        newMove.oldY = this.oldY
        return newMove
    }
}