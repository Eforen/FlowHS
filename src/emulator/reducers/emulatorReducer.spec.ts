import { expect } from 'chai';
import { describe } from 'mocha';
import { EmulatorState } from '../state/emulatorState';
import { NodeTypes } from '../state/nodeTypes';
import { NodeState } from '../state/nodeState';
import { OutputState } from '../state/outputState';
import { OutputTypes } from '../state/outputTypes';
import { EmulatorReducer } from './emultatorReducer';
import { emulatorActionTypes } from '../actions/actionTypes';


describe('Emulator Reducer', () => {
    describe('SIM_STEP_LOGIC', () => {
        it('should do the thing', () => {
            let test: EmulatorState = {
                step: 0,
                sleepTime: 0,
                changed: true,
                nodes: [
                    {
                        ID: 0,
                        type: NodeTypes.BIT_AND,
                        name: 'test1',
                        userName: 'test1u',
                        changed: true,
                        inputs: [
                            {
                                name: 'A',
                                value: true,
                                connection: {
                                    NodeID: 1,
                                    Pin: 0
                                },
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }, {
                                name: 'B',
                                value: true,
                                connection: undefined,
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }
                        ],
                        outputs: [{
                            name: 'Out',
                            value: false,
                            type: OutputTypes.BIT,
                            connections: []
                        } as OutputState]
                    } as NodeState, {
                        ID: 0,
                        type: NodeTypes.BIT_INPUT,
                        name: 'Input1',
                        userName: 'Input1u',
                        changed: false,
                        inputs: [],
                        outputs: [
                            {
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: true,
                                connections: [{
                                    NodeID: 1,
                                    Pin: 0
                                }]
                            } as OutputState
                        ]
                    } as NodeState
                ],
                updated: [],
                messages: []
            }
            //test.updated[1] = true

            let target: EmulatorState = {
                step: 0,
                sleepTime: 0,
                changed: true,
                nodes: [
                    {
                        ID: 0,
                        type: NodeTypes.BIT_AND,
                        name: 'test1',
                        userName: 'test1u',
                        changed: true,
                        inputs: [
                            {
                                name: 'A',
                                value: true,
                                connection: {
                                    NodeID: 1,
                                    Pin: 0
                                },
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }, {
                                name: 'B',
                                value: true,
                                connection: undefined,
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }
                        ],
                        outputs: [{
                            name: 'Out',
                            value: true,
                            type: OutputTypes.BIT,
                            connections: []
                        } as OutputState]
                    } as NodeState, {
                        ID: 0,
                        type: NodeTypes.BIT_INPUT,
                        name: 'Input1',
                        userName: 'Input1u',
                        changed: false,
                        inputs: [],
                        outputs: [
                            {
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: true,
                                connections: [{
                                    NodeID: 1,
                                    Pin: 0
                                }]
                            } as OutputState
                        ]
                    } as NodeState
                ],
                updated: [true],
                messages: []
            }
            //target.updated[1] = true

            let result = EmulatorReducer(test, { type: emulatorActionTypes.SIM_STEP_LOGIC })
            expect(result).to.deep.equal(target)
        })
    })

    describe('SIM_STEP_WIRE', () => {
        it('should do the thing', () => {
            let test: EmulatorState = {
                step: 0,
                sleepTime: 0,
                changed: true,
                nodes: [
                    {
                        ID: 0,
                        type: NodeTypes.BIT_AND,
                        name: 'test1',
                        userName: 'test1u',
                        changed: false,
                        inputs: [
                            {
                                name: 'A',
                                value: false,
                                connection: {
                                    NodeID: 1,
                                    Pin: 0
                                },
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }, {
                                name: 'B',
                                value: false,
                                connection: undefined,
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }
                        ],
                        outputs: []
                    } as NodeState, {
                        ID: 0,
                        type: NodeTypes.BIT_INPUT,
                        name: 'Input1',
                        userName: 'Input1u',
                        changed: true,
                        inputs: [],
                        outputs: [
                            {
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: true,
                                connections: [{
                                    NodeID: 1,
                                    Pin: 0
                                }]
                            } as OutputState
                        ]
                    } as NodeState
                ],
                updated: [],
                messages: []
            }
            test.updated[1] = true

            let target: EmulatorState = {
                step: 0,
                sleepTime: 0,
                changed: true,
                nodes: [
                    {
                        ID: 0,
                        type: NodeTypes.BIT_AND,
                        name: 'test1',
                        userName: 'test1u',
                        changed: true,
                        inputs: [
                            {
                                name: 'A',
                                value: true,
                                connection: {
                                    NodeID: 1,
                                    Pin: 0
                                },
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }, {
                                name: 'B',
                                value: false,
                                connection: undefined,
                                acceptsConnectionFrom: [OutputTypes.BIT]
                            }
                        ],
                        outputs: []
                    } as NodeState, {
                        ID: 0,
                        type: NodeTypes.BIT_INPUT,
                        name: 'Input1',
                        userName: 'Input1u',
                        changed: true,
                        inputs: [],
                        outputs: [
                            {
                                name: 'Out',
                                type: OutputTypes.BIT,
                                value: true,
                                connections: [{
                                    NodeID: 1,
                                    Pin: 0
                                }]
                            } as OutputState
                        ]
                    } as NodeState
                ],
                updated: [],
                messages: []
            }
            target.updated[1] = true

            let result = EmulatorReducer(test, {type: emulatorActionTypes.SIM_STEP_WIRES})
            expect(result).to.deep.equal(target)
        })
    })
})