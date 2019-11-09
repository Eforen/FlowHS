export interface IAction {
    type: any
}

export enum editorActionTypes {
    NOP,
    DRAG_NODE_START,
    DRAG_NODE_MOVE,
    DRAG_NODE_STOP,
    UPDATESTATE,
    NODE_CREATE,
    NODE_DELETE,
    NODE_RENAME,
    NODE_CONNECT,
    HOVER_ENTER,
    HOVER_LEAVE,
}