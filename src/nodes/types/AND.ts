import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IAndArgs extends NodeTypeArgs {
    inputs: string
}
export const ntAndArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.AND)
export class ntAnd extends BasicChip<IAndArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "AND",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntAndArgTypes)
    }

    getTitle(args: IAndArgs){
        return `${this.config.title}`
    }
}