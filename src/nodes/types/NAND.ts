import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface INandArgs extends NodeTypeArgs {
    inputs: string
}
export const ntNandArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType('NAND')
export class ntNand extends BasicChip<INandArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "NAND",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntNandArgTypes)
    }

    getTitle(args: INandArgs){
        return `${this.config.title}`
    }
}