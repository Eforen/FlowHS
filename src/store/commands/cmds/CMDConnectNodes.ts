import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Connection } from '@/store/flows/types';
import uuid from 'uuid';

export default class CMDConnectNodes extends Command {
    private useID: string = ''
    constructor(private guid: string, private guidA:string, private portA:number, private guidB: string, private portB:number){
        super()
        //console.log("debug")
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        //console.log("Debug: CMDConnectNodes.exe")
        //const {guid, fromID, fromPort, toID, toPort} = this.con

        this.useID = this.useID == '' ? (this.guid=='' ? uuid.v4() : this.guid) : this.useID

        dispatch('flows/createConnection', {conGUID: this.useID, fromID: this.guidA, fromPort: this.portA, toID: this.guidB, toPort: this.portB}, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        //console.log("Debug: CMDConnectNodes.undo")
        dispatch('flows/deleteConnection', this.useID, {root:true})
    }

    clone(): CMDConnectNodes {
        return new CMDConnectNodes(this.guid, this.guidA, this.portA, this.guidB, this.portB)
    }

    canMerge(that: CMDConnectNodes): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}