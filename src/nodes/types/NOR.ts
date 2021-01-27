import { SimulationNode } from "@/store/simulation/types";
import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface INorArgs extends NodeTypeArgs {
    inputs: string
}
export const ntNorArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.NOR)
export class ntNor extends BasicChip<INorArgs> {
    constructor(overrides: NodeTypeOptions = {}){
        super({
            title: "NOR",
            color: '#a6bbcf',
            inputs: 2,
            outputs: 1,
            ...overrides
        }, ntNorArgTypes)
    }

    getTitle(args: INorArgs){
        return `${this.config.title}`
    }

    processLogic(nodeState: SimulationNode): boolean[] | null {
        const result = (nodeState.inputState[0] || nodeState.inputState[1]) == false; // Not OR
        return nodeState.outputState[0] != result ? [result] : null;
    }
}