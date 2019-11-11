// types.ts

export interface SelectionState {
    selectedNodes: string[]
    dragging: boolean
    dragOffsetGridX: number
    dragOffsetGridY: number
    mouseStartX: number
    mouseStartY: number
}