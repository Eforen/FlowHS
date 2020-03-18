import Command from '@/store/commands/Command'
import { Dispatch } from 'vuex';
import { FullCombinedRootState } from '@/store/types';
import { Node, Connection, FlowsState } from '@/store/flows/types';
import uuid from 'uuid';
import CMDRemoveNode from './CMDRemoveNode';
import CMDDeleteConnection from './CMDDeleteConnection';
import { ObjectCount } from '@/util/ObjectDictionary';
import { SelectionState } from '@/store/selection/types';



export default class CMDDeleteGUIDs extends Command {
    private cmds: (CMDRemoveNode | CMDDeleteConnection)[] = []
    constructor(private guids: string[], state: FlowsState){
        super()
        guids.forEach(guid=>{
            try {
                if(state.nodes[guid] != undefined) {
                    this.cmds.push(new CMDRemoveNode(guid))
                }
            } catch (error) {
                // Nothing
            }
            // If was not a node
            try {
                if(state.connections[guid] != undefined) {
                    this.cmds.push(new CMDDeleteConnection(guid))
                }
            } catch (error) {
                // Nothing
            }
        })
    }

    shortDesc(): string {
        return `Delete ${this.guids.length} GUIDs`
    }

    exe(dispatch: Dispatch, state: FullCombinedRootState): void {
        this.cmds.forEach(cmd=>{
            cmd.exe(dispatch, state)
        })
    }

    undo(dispatch: Dispatch, state: FullCombinedRootState): void {
        this.cmds.forEach(cmd=>{
            cmd.undo(dispatch, state)
        })
    }

    clone(): CMDDeleteGUIDs {
        return this
    }

    canMerge(that: CMDDeleteGUIDs): boolean {
        return false
    }

    merge(other: Command): Command {
        throw new Error("This Method should not be called at any time.");
    }
}