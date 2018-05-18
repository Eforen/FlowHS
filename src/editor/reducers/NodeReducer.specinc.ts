import { expect } from 'chai';
import { describe } from 'mocha';
import { MoveState, MoveType, MoveStateDefault } from '../state/MoveState';
//import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { EditorReducer } from './EditorReducer';
import { EditorStateDefault, EditorState } from '../state/editorState';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { OutputTypes } from '../../emulator/state/outputTypes';
import { nodeCreate } from '../actions/nodeCreate';

describe('NodesReducers', () => {
    describe('AddNode', () => {
        let gates = [
            {
                type: LogicTypes.BIT_AND,
                name: 'AND Gate'
            }, {
                type: LogicTypes.BIT_NAND,
                name: 'NAND Gate'
            }, {
                type: LogicTypes.BIT_OR,
                name: 'OR Gate'
            }, {
                type: LogicTypes.BIT_NOR,
                name: 'NOR Gate'
            }, {
                type: LogicTypes.BIT_XOR,
                name: 'XOR Gate'
            }, {
                type: LogicTypes.BIT_XNOR,
                name: 'XNOR Gate'
            }
        ]

        gates.forEach(gate => {
            it('Should add single ' + gate.name + ' and mark for update', () => {
                let pos = [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200]

                let target = {
                    ...EditorStateDefault,
                    nodeMoving: {
                        dragging: false,
                        type: MoveType.Node,
                        posStartX: 0,
                        posStartY: 0,
                        posOffsetX: 0,
                        posOffsetY: 0,
                        posCurrentX: 0,
                        posCurrentY: 0,
                        nodeID: -1,
                        output: -1,
                        input: -1
                    },
                    nextNodeID: 1,
                    nodes: [{
                        x: pos[0], y: pos[1]
                    }],
                    emulator: {
                        step: 0,
                        sleepTime: 0,
                        changed: false,
                        nodes: [{
                            ID: -1,
                            name: gate.name,
                            userName: '',
                            type: gate.type,
                            inputs: [
                                { name: 'A', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined },
                                { name: 'B', value: 0, acceptsConnectionFrom: [OutputTypes.BIT], connection: undefined }
                            ],
                            outputs: [{
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: (gate.type == LogicTypes.BIT_NOR || gate.type == LogicTypes.BIT_XNOR) ? 1 : 0,
                                connections: []
                            }],
                            changed: true
                        }],
                        updated: [true],
                        messages: []
                    }
                } as EditorState

                let result = EditorReducer(EditorStateDefault, nodeCreate(gate.type, pos[0], pos[1]))
                expect(result).to.deep.equal(target)
            })
        });
    })
    it.skip('DeleteNode', () => {

    })
    it.skip('RenameNode', () => {

    })
    it.skip('ConnectNode', () => {

    })
})