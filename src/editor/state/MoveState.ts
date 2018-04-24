export enum MoveType {
    Node,
    ConnectorInput,
    ConnectorOutput
}

export interface MoveState {
    dragging: boolean
    type: MoveType
    posStartX: number
    posStartY: number
    posOffsetX: number
    posOffsetY: number
    posCurrentX: number
    posCurrentY: number
    nodeID: number
    output: number
    input: number
}

export const MoveStateDefault: MoveState = {
    dragging: false,
    type: MoveType.Node,
    posStartX: 0,
    posStartY: 0,
    posOffsetX: 0,
    posOffsetY: 0,
    posCurrentX: 0,
    posCurrentY: 0,
    nodeID: -1,
    output: -1,
    input: -1
}