import { SimulationNode } from "@/store/simulation/types";
import NodeType, { NodeTypeOptions, NodeTypeArgsDef, NodeTypeArgs, NodeLogicType } from "../NodeType";
import { registerNodeType } from '../NodeTypeDictionary';
import BasicChip from './BasicChip';

export interface INandArgs extends NodeTypeArgs {
    inputs: string
}
export const ntNandArgTypes: NodeTypeArgsDef = {
    inputs: 'string'
}

@registerNodeType(NodeLogicType.NAND)
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

    processLogic(nodeState: SimulationNode): boolean[] | null {
        const result = (nodeState.inputState[0] && nodeState.inputState[1]) == false; // Not AND
        return nodeState.outputState[0] != result ? [result] : null;
    }
}