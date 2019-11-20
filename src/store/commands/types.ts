import Command from './Command';

// types.ts

export interface CommandsState {
    historyCount: number
    history: Command[]
    //TODO: setup Redo History
}