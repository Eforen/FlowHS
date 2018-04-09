import { NodeState} from '../state/nodeState';
import { NodeTypes } from '../state/nodeTypes';

export const nodeProcesser: (node: NodeState) => NodeState = (node) => {
    if (node.changed == false){
        return node
    }
    let val: boolean = false;
    switch (node.type) {
        case NodeTypes.BIT_AND:
            val = (node.inputs[0].value as boolean) && (node.inputs[1].value as boolean)
            break;
        case NodeTypes.BIT_NAND:
            val = ((node.inputs[0].value as boolean) && (node.inputs[1].value as boolean)) == false
            break;
        case NodeTypes.BIT_OR:
            val = (node.inputs[0].value as boolean) || (node.inputs[1].value as boolean)
            break;
        case NodeTypes.BIT_NOR:
            val = ((node.inputs[0].value as boolean) || (node.inputs[1].value as boolean)) == false
            break;
        case NodeTypes.BIT_XOR:
            val = (node.inputs[0].value as boolean) != (node.inputs[1].value as boolean)
            break;
        case NodeTypes.BIT_XNOR:
            val = (node.inputs[0].value as boolean) == (node.inputs[1].value as boolean)
            break;
        default:
            return node
    }
    if (val == node.outputs[0].value) {
        if (node.changed) {
            return {
                ...node, changed: false
            }
        }
        return node
    }
    return {
        ...node, outputs: [{
            ...node.outputs[0], value: val
        }],
        changed: true
    }
}

const output = (node: NodeState, val: boolean) => {
    if (val == node.outputs[0].value) {
        if (node.changed) {
            return {
                ...node, changed: false
            }
        }
        return node
    }
    return {
        ...node, outputs: [{
            ...node.outputs[0], value: val
        }],
        changed: true
    }
}