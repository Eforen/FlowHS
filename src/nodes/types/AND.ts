import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IAndArgs extends NodeTypeArgs {
    inputs: string
}
export const ntAndArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType('AND')
export class ntAnd extends BasicChip<IAndArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "And",
            color: '#a6bbcf',
            inputs: 7,
            outputs: 1,
            ...overrides
        }, ntAndArgTypes)
    }

    getTitle(args: IAndArgs){
        return `${this.config.title}`
    }
}