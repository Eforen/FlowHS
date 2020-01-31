import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Flow, Connection } from '@/store/flows/types';
import { ObjectForEach, ObjectFilter } from '@/util/ObjectDictionary';
import { SelectionPayloadAddSelected } from '@/store/selection/actions';

export default class CMDRemoveNode extends Command {
    private wasInFlows: string[] = []
    private cachedNode: Node | null = null
    private cachedCons: Connection[] = []
    private cachedSelected: string[] = []

    constructor(private nodeID: string){
        super()
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        ObjectForEach(state.flows.flows, (key, flow: Flow) => {
            if(flow.nodes.indexOf(this.nodeID) != -1){
                if(this.wasInFlows.includes(flow.guid) == false) this.wasInFlows.push(flow.guid)
            }
        })
        this.cachedNode = state.flows.nodes[this.nodeID]
        this.cachedCons = []
        ObjectForEach(state.flows.connections, (key, con:Connection) => {
            if(con.fromID == this.nodeID || con.toID == this.nodeID){
                this.cachedCons.push(con)
            }
        })
        this.cachedSelected = []
        if(state.selection.selected.includes(this.nodeID)) this.cachedSelected.push(this.nodeID)
        this.cachedCons.forEach(con=>{
            if(state.selection.selected.includes(con.guid)) this.cachedSelected.push(con.guid)
        })
        dispatch('flows/deleteNode', this.nodeID, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        dispatch('flows/createNodeInFlow', {flowID: this.wasInFlows[0], node: this.cachedNode} as {flowID: string, node: Node}, {root:true})
        //console.log(`Recreate Connections`)
        this.cachedCons.forEach(con => {
            //console.log(`Recreate Connection: ${con.guid}`)
            dispatch('flows/createConnection', {conGUID: con.guid, fromID: con.fromID, fromPort: con.fromPort, toID: con.toID, toPort: con.toPort}, {root:true})
        })
        dispatch('selection/addSelected', this.cachedSelected as SelectionPayloadAddSelected, {root:true})
        
    }

    clone(): CMDRemoveNode {
        return new CMDRemoveNode(this.nodeID)
    }

    canMerge(other: CMDRemoveNode): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}