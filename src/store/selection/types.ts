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
    /** The node port that the drag started at */
    draggingConnectionNodePort: number
    dragOffsetGridX: number
    dragOffsetGridY: number
    dragOffsetX: number
    dragOffsetY: number
    mouseStartX: number
    mouseStartY: number
}