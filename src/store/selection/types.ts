// types.ts

export interface SelectionState {
    selectedNodes: string[]
    dragging: boolean
    dragOffsetGridX: number
    dragOffsetGridY: number
    mouseOffsetX: number
    mouseOffsetY: number
}