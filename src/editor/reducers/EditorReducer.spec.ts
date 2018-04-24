import { expect } from 'chai';
import { describe } from 'mocha';
import { MoveState, MoveType, MoveStateDefault } from '../state/MoveState';
import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { editorActionTypes } from '../actions/actionTypes';
import { NodeMoveReducer } from './NodeMoveReducer';
import { EditorNodeStateDefault } from '../state/EditorNodeState';
import { EditorReducer } from './EditorReducer';
import { EditorStateDefault } from '../state/editorState';


describe('Editor Reducer', () => {
    it('Default State Setup', () => {
        let target = {
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
            nodes: [],
            emulator: {
                step: 0,
                sleepTime: 0,
                changed: false,
                nodes: [],
                updated: [],
                messages: []
            }
        }

        let result = EditorReducer(EditorStateDefault, {type: editorActionTypes.NOP})
        expect(result).to.deep.equal(target)
    })
    describe('Editor Move Reducer', () => {
        describe('DRAG_NODE_START', () => {
            it('Fresh Drag Already in clean state', () => {
                let test = {
                    nodeMoving: MoveStateDefault,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let target = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: 5,
                        posStartY: 7,
                        posOffsetX: 8,
                        posOffsetY: 9,
                        posCurrentX: 5,
                        posCurrentY: 7,
                        nodeID: 2,
                        output: -1,
                        input: -1,
                    } as MoveState,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let action = {
                    type: editorActionTypes.DRAG_NODE_START,
                    node: 2,
                    start: [5, 7],
                    offset: [8, 9],
                    targetType: MoveType.Node
                }

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
            it.skip('Fresh Drag clean state', () => {
                expect(false).to.equal(true, 'No Tests Writen Yet')
            })
            it('Already in drag', () => {
                let test = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: 9,
                        posStartY: 14,
                        posOffsetX: 6,
                        posOffsetY: 7,
                        posCurrentX: 12,
                        posCurrentY: 15,
                        nodeID: 1,
                        output: -1,
                        input: -1
                    },
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let target = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: 5,
                        posStartY: 7,
                        posOffsetX: 8,
                        posOffsetY: 9,
                        posCurrentX: 5,
                        posCurrentY: 7,
                        nodeID: 2,
                        output: -1,
                        input: -1,
                    } as MoveState,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 9 - 6, y: 14 - 7 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let action = {
                    type: editorActionTypes.DRAG_NODE_START,
                    node: 2,
                    start: [5, 7],
                    offset: [8, 9],
                    targetType: MoveType.Node
                }

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
        })
        describe('DRAG_NODE_MOVE', () => {
            it('should test', () => {
                let test = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: 5,
                        posStartY: 7,
                        posOffsetX: 6,
                        posOffsetY: 8,
                        posCurrentX: 5,
                        posCurrentY: 7,
                        nodeID: 2,
                        output: -1,
                        input: -1
                    },
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let target = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: 5,
                        posStartY: 7,
                        posOffsetX: 6,
                        posOffsetY: 8,
                        posCurrentX: 14,
                        posCurrentY: 24,
                        nodeID: 2,
                        output: -1,
                        input: -1,
                    } as MoveState,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 14 - 6, y: 24 - 8 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let action = {
                    type: editorActionTypes.DRAG_NODE_MOVE,
                    pos: [14, 24]
                }

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
        })
        describe('DRAG_NODE_STOP', () => {
            it.skip('should test', () => {
                expect(false).to.equal(true, 'No Tests Writen Yet')
            })
        })
    })
})