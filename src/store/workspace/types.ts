// types.ts

export interface WorkspaceState {
    size: {
        height: number,
        width: number,
    },
    grid: {
        height: number,
        width: number,
    },
    prefrences: {
        shiftMove: number
    },
    editor: {
        selectedFlow: number
        loadedFlows: string[]
    }
}