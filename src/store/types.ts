import { FlowsState } from './flows/types';
import { SelectionState } from './selection/types';
import { WorkspaceState } from './workspace/types';
import { CommandsState } from './commands/types';

export interface RootState {
    version: string
    flows: FlowsState
    selection: SelectionState
    workspace: WorkspaceState
    commands: CommandsState
}

export interface FullCombinedRootState extends RootState{
    flows: FlowsState
    selection: SelectionState
    workspace: WorkspaceState
    commands: CommandsState
}