// types.ts

export interface SelectionState {
    selectedNodes: string[]
    draggingNode: boolean
    /** Is a connection drag in progress */
    draggingConnection: boolean
    /** If true the connection being dragged is an output*/
    draggingConnectionFromOutput: boolean
    /** The node that the drag started at */
    draggingConnectionNode: string
    dragOffsetGridX: number
    dragOffsetGridY: number
    mouseStartX: number
    mouseStartY: number
}