import { NodeTypes } from '../state/nodeTypes';
import { NodeState } from '../state/nodeState';
import { OutputTypes } from '../state/outputTypes';

export const createBasic: (type: NodeTypes) => NodeState = (type) => {
    switch (type) {
        case NodeTypes.BIT_AND:
            return {
                ID: -1,
                name: 'AND Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 0,
                    connections: []
                }],
                changed: true
            }
        case NodeTypes.BIT_NAND:
            return {
                ID: -1,
                name: 'NAND Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 0,
                    connections: []
                }],
                changed: true
            }
        case NodeTypes.BIT_OR:
            return {
                ID: -1,
                name: 'OR Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 0,
                    connections: []
                }],
                changed: true
            }
        case NodeTypes.BIT_NOR:
            return {
                ID: -1,
                name: 'NOR Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 1,
                    connections: []
                }],
                changed: true
            }
        case NodeTypes.BIT_XOR:
            return {
                ID: -1,
                name: 'XOR Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 0,
                    connections: []
                }],
                changed: true
            }
        case NodeTypes.BIT_XNOR:
            return {
                ID: -1,
                name: 'XNOR Gate',
                userName: '',
                type: type,
                inputs: [
                    { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                    { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                ],
                outputs: [{
                    name: 'Out',
                    type: OutputTypes.BIT,
                    value: 1,
                    connections: []
                }],
                changed: true
            }
        default:
            return {
                ID: -1,
                name: 'Error',
                userName: '',
                type: type,
                inputs: [],
                outputs: [],
                changed: true
            }
    }
}