import Command from './Command';

// types.ts

export interface CommandsState {
    historyCount: number
    history: Command[]
    redo: Command[]
    //TODO: setup Redo History
}