import NodeType, { NodeTypeArgs, NodeTypeOptionSet, NodeTypeArgsDef, NodeTypeOptions } from '../NodeType'

export default abstract class BasicChip<T extends NodeTypeArgs> extends NodeType<T> {
    constructor(overrides: NodeTypeOptions = {}, types: NodeTypeArgsDef = {}){
        super({
            ...overrides
        })
    }
    
    getRootX(args: T): number {
        return args.x * this.rootState.workspace.grid.width
    }
    getRootY(args: T): number {
        return args.y * this.rootState.workspace.grid.height + this.yOffset(args)
    }

    // getX(args: T): number {
    //     const dragOffsetX = (this.rootState.selection.dragging && 
    //         this.rootState.selection.selectedNodes.includes(this.guid) && 
    //         this.guid.toLowerCase()!='pallet' ? 
    //             this.rootState.selection.dragOffsetGridX : 0)
    //         * this.workspace.grid.width
    //     return args.x * this.rootState.workspace.grid.width + dragOffsetX
    // }
    // getY(args: T): number {
    //     const dragOffsetY = (this.rootState.selection.dragging  && 
    //         this.rootState.selection.selectedNodes.includes(this.guid) && 
    //         this.guid.toLowerCase()!='pallet' ? 
    //             this.rootState.selection.dragOffsetGridY  : 0)
    //         * this.workspace.grid.height
    //     return args.y * this.rootState.workspace.grid.height + this.yOffset(args) + dragOffsetY
    // }

    maxPinCount(args: T) {
        return Math.max(0, this.getOutputs(args), this.getInputs(args)) 
    }
    heightMod(args: T) {
        return Math.max(0, ( this.maxPinCount(args) - 2 )) * 15
    }
    yOffsetMod(args: T) {
        return (7.5 * Math.max(0, ( this.maxPinCount(args) - 2 ))) 
    }
    firstOutPinY(args: T) {
        return ((this.getHeight(args) - 10) - (13 * (this.getOutputs(args) - 1))) / 2 
    }
    firstInPinY(args: T) {
        return ((this.getHeight(args) - 10) - (13 * (this.getInputs(args) - 1))) / 2 
    }
    textWidthEstimation(args: T) {
        return 14 * this.getTitle(args).length * 0.6 
    }
    neededWidth(args: T) {
        return (this.getIcon(args)!=''? 30 : 0) + 8 + this.textWidthEstimation(args) + 8 
    } //30 8 text 8
    desiredWidth(args: T) {
        return Math.ceil(
            this.neededWidth(args) 
            /
            this.rootState.workspace.grid.width
        ) * this.rootState.workspace.grid.width
    }

    getWidth(args: T): number {
        return this.desiredWidth(args)
    }
    getHeight(args: T): number {
        return 30 + this.heightMod(args)
    }
    yOffset(args: T): number {
        return (
            ( Math.ceil( this.getHeight(args) / this.rootState.workspace.grid.height ) * this.rootState.workspace.grid.height )
            - this.getHeight(args)
        )
        / 2
    }
    getLabelX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args) : 0) + (this.getIcon(args) != '' ? 38 : 8)
    }
    getLabelY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args) : 0) + 14 + this.yOffsetMod(args)
    }

    getInputX(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootX(args) : 0) + -5
    }
    getInputY(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootY(args) : 0) + 13 * (index - 1) + this.firstInPinY(args)
    }

    getOutputX(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootX(args) : 0) + this.desiredWidth(args) - 5
    }
    getOutputY(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootY(args) : 0) + 13 * (index - 1) + this.firstOutPinY(args)
    }

    getChangedX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args) : 0) + 150
    }
    getChangedY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args) : 0) + -2
    }

    getErrorX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args) : 0) + 150

    }
    getErrorY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args) : 0) + -2
    }
}