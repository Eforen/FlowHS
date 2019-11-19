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

export default class NodeType<T> {
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

    getTitle(args: T): string { return this.config.title }
    getButton(args: T): boolean { return this.config.button }
    getInputs(args: T): number { return this.config.inputs }
    getOutputs(args: T): number { return this.config.outputs }
    getIcon(args: T): string { return this.config.icon }
    getColor(args: T): string { return this.config.color }
}