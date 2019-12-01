import { NodeTypeArgs } from '@/nodes/NodeType';

// types.ts
export interface Node {
    error: boolean
    changed: boolean
    selected: boolean
    type: string
    args: NodeTypeArgs
    inputState: boolean[]
    outputState: boolean[]
}

export interface NodeDictionary {
    [index: string]: Node;
}

export interface Flow {
    guid: string
    isProxy: boolean //If set it means that filename is a guid that refurs to a portion of an active flow not to a file
    filename: string
    title: string
    error: boolean
    changed: boolean
    inputs: string[]
    outputs: string[]
    nodes: string[]
    connections: string[]
}

export interface FlowDictionary {
    [index: string]: Flow;
}

export interface Connection {
    guid: string
    fromID: string
    fromPort: number
    toID: string
    toPort: number
    state: boolean[]
    selected: boolean
}

export interface ConnectionDictionary {
    [index: string]: Connection;
}

export interface FlowsState {
    connectedToBackend: boolean
    nodes: NodeDictionary
    flows: FlowDictionary
    connections: ConnectionDictionary
}