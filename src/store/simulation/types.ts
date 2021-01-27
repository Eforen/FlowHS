// types.ts

import NodeType, { NodeTypeArgs } from "@/nodes/NodeType";

export const SimulationRoot = 'simulation'

export interface SimulationNode {
    type: string,
    guid: string,
    inputState: boolean[],
    outputState: boolean[],
    outputGuids: (string|null)[]
    cachedLogic?: (nodeState: SimulationNode) => boolean[] | null
}
export interface SimulationConnection {
    guid: string,
    state: boolean[]
    from: string,
    fromPin: number
    to: string
    toPin: number
}

export interface SimulationState {
    nodes: { [key: string]: SimulationNode }
    connections: { [key: string]: SimulationConnection }
}