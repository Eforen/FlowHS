import { RootState } from '@/store/types'
import store from '@/store'

export interface NodeTypeOptionSet {
    title: string
    button: boolean, 
    inputs: number, 
    outputs: number, 
    icon: string, 
    color: string
}
export interface NodeTypeOptions {
    title?: string
    button?: boolean, 
    inputs?: number, 
    outputs?: number, 
    icon?: string, 
    color?: string
}
export interface NodeTypeArgsDef {
    [index: string]: string
}

export interface NodeTypeArgs {
    guid: string
    x: number
    y: number
}

export default abstract class NodeType<T extends NodeTypeArgs> {
    static defaultOptions: NodeTypeOptionSet = {
        title: 'Node', 
        button: false, 
        inputs: 0, 
        outputs: 0, 
        icon: '', 
        color: '#a6bbcf'
    }

    config: NodeTypeOptionSet
    types: NodeTypeArgsDef

    constructor(options: NodeTypeOptions, types: NodeTypeArgsDef = {}){
        this.config = {...NodeType.defaultOptions, ...options }
        this.types = types
    }

    protected get rootState(): RootState { return store.state }

    getTitle(args: T): string { return this.config.title }
    getButton(args: T): boolean { return this.config.button }
    getInputs(args: T): number { return this.config.inputs }
    getOutputs(args: T): number { return this.config.outputs }
    getIcon(args: T): string { return this.config.icon }
    getColor(args: T): string { return this.config.color }

    abstract getRootX(args: T): number
    abstract getRootY(args: T): number

    abstract getWidth(args: T): number
    abstract getHeight(args: T): number

    abstract getLabelX(args: T, absolute: boolean): number
    abstract getLabelY(args: T, absolute: boolean): number

    abstract getInputX(args: T, index: number, absolute: boolean): number
    abstract getInputY(args: T, index: number, absolute: boolean): number

    abstract getOutputX(args: T, index: number, absolute: boolean): number
    abstract getOutputY(args: T, index: number, absolute: boolean): number

    abstract getChangedX(args: T, absolute: boolean): number
    abstract getChangedY(args: T, absolute: boolean): number

    abstract getErrorX(args: T, absolute: boolean): number
    abstract getErrorY(args: T, absolute: boolean): number
}