// types.ts

export const SimulationRoot = 'simulation'

export interface SimulationNode {
    type: string,
    guid: string,
    inputState: boolean[],
    outputState: boolean[]
}
export interface SimulationConnection {
    guid: string,
    state: boolean[]
}

export interface SimulationState {
    nodes: { [key: string]: SimulationNode }
    connections: { [key: string]: SimulationConnection }
}