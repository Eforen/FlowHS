import NodeType, { NodeTypeArgs, NodeTypeOptionSet, NodeTypeArgsDef, NodeTypeOptions } from '../NodeType'

export default abstract class BasicChip<T extends NodeTypeArgs> extends NodeType<T> {
    constructor(overrides: NodeTypeOptions = {}, types: NodeTypeArgsDef = {}){
        super({
            ...overrides
        })
    }
    
    getRootX(args: T, absolute: boolean): number {
        const dragOffsetX = (this.rootState.selection.draggingNode && 
            this.rootState.selection.selected.includes(args.guid) && 
            args.guid.toLowerCase()!='pallet' ? 
                this.rootState.selection.dragOffsetGridX : 0)
            * this.rootState.workspace.grid.width
        return args.x * this.rootState.workspace.grid.width + dragOffsetX
    }
    getRootY(args: T, absolute: boolean): number {
        const dragOffsetY = (this.rootState.selection.draggingNode  && 
            this.rootState.selection.selected.includes(args.guid) && 
            args.guid.toLowerCase()!='pallet' ? 
                this.rootState.selection.dragOffsetGridY  : 0)
            * this.rootState.workspace.grid.height
        return args.y * this.rootState.workspace.grid.height + this.yOffset(args) + dragOffsetY //need to adjust for offset of center vs corner
    }

    // getX(args: T): number {
    //     return args.x * this.rootState.workspace.grid.width + dragOffsetX
    // }
    // getY(args: T): number {
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
        return ((this.getHeight(args) - this.rootState.workspace.grid.height / 2) - (13 * (this.getOutputs(args) - 1))) / 2
        //return ((13 * (this.getOutputs(args))) - (this.getHeight(args) - this.yOffset(args) * 2)) / 2 
    }
    firstInPinY(args: T) {
        return ((this.getHeight(args) - this.rootState.workspace.grid.height / 2) - (13 * (this.getInputs(args) - 1))) / 2
        //return ((this.getHeight(args) - this.yOffset(args) * 2) - (13 * (this.getInputs(args)))) / 2 
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
            ( 
                Math.ceil( this.getHeight(args) / this.rootState.workspace.grid.height ) 
                * this.rootState.workspace.grid.height 
            )
            - this.getHeight(args)
        )
        / 2
    }
    getLabelX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args, absolute) : 0) + (this.getIcon(args) != '' ? 38 : 8)
    }
    getLabelY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args, absolute) : 0) + 14 + this.yOffsetMod(args)
    }

    getInputX(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootX(args, absolute) : 0) + -5
    }
    getInputY(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootY(args, absolute) : 0) + 13 * index + this.firstInPinY(args)
    }

    getOutputX(args: T, index: number, absolute: boolean): number {
        return (absolute? this.getRootX(args, absolute) : 0) + this.desiredWidth(args) - 5
    }
    getOutputY(args: T, index: number, absolute: boolean): number {
        // if(absolute === false){
        //     console.log("ChipA")
        //     console.log({t:this, args, index, absolute})
        // }

        return (absolute? this.getRootY(args, absolute) : 0) + 13 * index + this.firstOutPinY(args)
        //return (absolute? this.getRootY(args, absolute) : 0) + 13 * (index - 1) + this.firstOutPinY(args)
    }

    getChangedX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args, absolute) : 0) + 150
    }
    getChangedY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args, absolute) : 0) + -2
    }

    getErrorX(args: T, absolute: boolean): number {
        return (absolute? this.getRootX(args, absolute) : 0) + 150

    }
    getErrorY(args: T, absolute: boolean): number {
        return (absolute? this.getRootY(args, absolute) : 0) + -2
    }
}