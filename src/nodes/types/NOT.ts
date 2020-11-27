import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface INotArgs extends NodeTypeArgs {
    inputs: string
}
export const ntNotArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType('NOT')
export class ntNot extends BasicChip<INotArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "NOT",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntNotArgTypes)
    }

    getTitle(args: INotArgs){
        return `${this.config.title}`
    }
}