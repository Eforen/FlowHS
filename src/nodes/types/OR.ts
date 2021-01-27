import { SimulationNode } from "@/store/simulation/types";
import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IOrArgs extends NodeTypeArgs {
    inputs: string
}
export const ntOrArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.OR)
export class ntOr extends BasicChip<IOrArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "OR",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntOrArgTypes)
    }

    getTitle(args: IOrArgs){
        return `${this.config.title}`
    }

    processLogic(nodeState: SimulationNode): boolean[] | null {
        const result = nodeState.inputState[0] || nodeState.inputState[1]; // OR
        return nodeState.outputState[0] != result ? [result] : null;
    }
}