import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IXorArgs extends NodeTypeArgs {
    inputs: string
}
export const ntXorArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType('XOR')
export class ntXor extends BasicChip<IXorArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "XOR",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntXorArgTypes)
    }

    getTitle(args: IXorArgs){
        return `${this.config.title}`
    }
}