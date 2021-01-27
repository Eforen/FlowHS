import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IRelayArgs extends NodeTypeArgs {
    inputs: string
}
export const ntRelayArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.RELAY)
export class ntRelay extends BasicChip<IRelayArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "Relay",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntRelayArgTypes)
    }

    getTitle(args: IRelayArgs){
        return `${this.config.title}`
    }
}