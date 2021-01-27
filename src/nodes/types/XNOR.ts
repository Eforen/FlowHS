import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IXnorArgs extends NodeTypeArgs {
    inputs: string
}
export const ntXnorArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.XNOR)
export class ntXnor extends BasicChip<IXnorArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "XNOR",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntXnorArgTypes)
    }

    getTitle(args: IXnorArgs){
        return `${this.config.title}`
    }
}