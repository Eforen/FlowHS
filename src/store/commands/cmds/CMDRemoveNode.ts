import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Flow, Connection } from '@/store/flows/types';
import { ObjectForEach } from '@/util/ObjectDictionary';

export default class CMDRemoveNode extends Command {
    private wasInFlows: string[] = []
    private wasInConnections: Connection[] = []

    constructor(private node: Node, private flow: string = "current"){
        super()
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        ObjectForEach(state.flows.flows, (key, flow: Flow) => {
            if(flow.nodes.indexOf(this.node.guid) != -1){
                if(this.wasInFlows.includes(flow.guid) == false) this.wasInFlows.push(flow.guid)
            }
        })
        dispatch('flows/deleteNode', this.node, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        if(this.flow == "current"){
            dispatch('flows/createNodeInSelectedFlow', this.node, {root:true})
        } else{
            dispatch('flows/createNodeInFlow', {flowID: this.flow, node: this.node} as {flowID: string, node: Node}, {root:true})
        }
    }

    clone(): CMDRemoveNode {
        return new CMDRemoveNode(this.node, this.flow)
    }

    canMerge(other: CMDRemoveNode): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}