import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Connection } from '@/store/flows/types';
import uuid from 'uuid';

export default class CMDDeleteConnection extends Command {
    private wasCon: Connection | null = null
    constructor(private guid: string){
        super()
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        this.wasCon = state.flows.connections[this.guid]
        dispatch('flows/deleteConnection', this.guid, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        if(this.wasCon == null){
            throw "CMDDeleteConnection was undone before being done"
        }
        const {guid, fromID, fromPort, toID, toPort} = this.wasCon
        dispatch('flows/createConnection', {conGUID: guid, fromID, fromPort, toID, toPort}, {root:true})
    }

    clone(): CMDDeleteConnection {
        return this
    }

    canMerge(that: CMDDeleteConnection): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}