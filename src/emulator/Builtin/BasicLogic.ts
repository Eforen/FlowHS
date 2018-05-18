import { LogicTypes } from '../state/nodeTypes';
import { NodeState } from '../state/nodeState';
import { OutputTypes } from '../state/outputTypes';

export const createBasic: (id: number, type: LogicTypes) => NodeState = (id, type) => {
    switch (type) {
        case LogicTypes.BIT_AND:
            return {
                ID: id,
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
        case LogicTypes.BIT_NAND:
            return {
                ID: id,
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
        case LogicTypes.BIT_OR:
            return {
                ID: id,
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
        case LogicTypes.BIT_NOR:
            return {
                ID: id,
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
        case LogicTypes.BIT_XOR:
            return {
                ID: id,
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
        case LogicTypes.BIT_XNOR:
            return {
                ID: id,
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
                ID: id,
                name: 'Error',
                userName: '',
                type: type,
                inputs: [],
                outputs: [],
                changed: true
            }
    }
}