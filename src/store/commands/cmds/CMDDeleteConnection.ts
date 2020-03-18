import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Connection } from '@/store/flows/types';
import uuid from 'uuid';

export default class CMDDeleteConnection extends Command {
    private wasCon: Connection | null = null
    private wasSelected: boolean = false
    constructor(private guid: string){
        super()
    }

    shortDesc(): string {
        if(this.wasCon) return `Delete Connection ${this.wasCon.fromID}:${this.wasCon.fromPort} ->  ${this.wasCon.toID}:${this.wasCon.toPort}`
        else return `Delete Connection ${this.guid}`
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        this.wasCon = state.flows.connections[this.guid]
        this.wasSelected = false
        try {
            if(state.selection.selected.includes(this.guid)) this.wasSelected = true
        } catch (error) {
            // Nothing
        }
        dispatch('flows/deleteConnection', this.guid, {root:true})
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        if(this.wasCon == null){
            throw "CMDDeleteConnection was undone before being done"
        }
        const {guid, fromID, fromPort, toID, toPort} = this.wasCon
        dispatch('flows/createConnection', {conGUID: guid, fromID, fromPort, toID, toPort}, {root:true})
        if(this.wasSelected) dispatch('selection/addSelected', [this.guid], {root:true})
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