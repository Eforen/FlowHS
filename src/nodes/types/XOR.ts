import { SimulationNode } from "@/store/simulation/types";
import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface IXorArgs extends NodeTypeArgs {
    inputs: string
}
export const ntXorArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.XOR)
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

    processLogic(nodeState: SimulationNode): boolean[] | null {
        const result = (nodeState.inputState[0] || nodeState.inputState[1]) && (nodeState.inputState[0] != nodeState.inputState[1]); // OR
        return nodeState.outputState[0] != result ? [result] : null;
    }
}