// types.ts
export interface Node {
    guid: string
    x: number
    y: number
    title: string
    error: boolean
    changed: boolean
    selected: boolean
    button: boolean
    inputs: number
    outputs: number
    icon: string
    color: string
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
    fromPort: number
    toPort: number
    fromID: string
    toID: string
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