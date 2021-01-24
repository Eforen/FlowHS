import { FlowsState } from './flows/types';
import { SelectionState } from './selection/types';
import { WorkspaceState } from './workspace/types';
import { CommandsState } from './commands/types';
import { NotificationState } from './notification/types';
import { SimulationState } from './simulation/types';

export interface RootState {
    version: string
    flows: FlowsState
    selection: SelectionState
    simulation: SimulationState
    notification: NotificationState
    workspace: WorkspaceState
    commands: CommandsState
}

export interface FullCombinedRootState extends RootState{
    flows: FlowsState
    notification: NotificationState
    selection: SelectionState
    simulation: SimulationState
    workspace: WorkspaceState
    commands: CommandsState
}