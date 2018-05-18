import { expect } from 'chai';
import { describe } from 'mocha';
import { MoveState, MoveType, MoveStateDefault } from '../state/MoveState';
import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { editorActionTypes } from '../actions/actionTypes';
import { EditorReducer } from './EditorReducer';
import { makeActionDragConnectorStart } from '../actions/dragActions';
import { EditorStateDefault, EditorState } from '../state/editorState';
import { HoverStateDefault } from '../state/HoverState';

describe('Editor Move Reducer', () => {
    describe('DRAG_NODE_START', () => {
        it('Fresh Drag Already in clean state', () => {
            let test = {
                ...EditorStateDefault,
                nodeMoving: MoveStateDefault,
                nextNodeID: 0,
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
                ...EditorStateDefault,
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
                nextNodeID: 0,
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


        for (let i = 0; i < 10; i++) {
            let ox = (Math.random() - 0.5) * 400
            let oy = (Math.random() - 0.5) * 400
            let sx = (Math.random() - 0.5) * 400
            let sy = (Math.random() - 0.5) * 400

            let mx = (Math.random() - 0.5) * 400
            let my = (Math.random() - 0.5) * 400

            let input = Math.random() >= 0.5

            let node = Math.trunc((Math.random()) * 400)
            let connector = Math.trunc((Math.random()) * 400)

            it('should setup connector drag #' + (i + 1), () => {
                let test = {
                    nodeMoving: MoveStateDefault,
                    nextNodeID: 0,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault,
                    hover: HoverStateDefault
                }
                let target = {
                    nodeMoving: {
                        dragging: true,
                        type: input ? MoveType.ConnectorInput : MoveType.ConnectorOutput,
                        posStartX: sx,
                        posStartY: sy,
                        posOffsetX: ox,
                        posOffsetY: oy,
                        posCurrentX: sx,
                        posCurrentY: sy,
                        nodeID: node,
                        output: input == false ? connector : -1,
                        input: input ? connector : -1,
                    } as MoveState,
                    nextNodeID: 0,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault,
                    hover: HoverStateDefault
                }
                let action = makeActionDragConnectorStart(
                    node,
                    [sx, sy],
                    [ox, oy],
                    input,
                    connector)

                //console.log('omg1')
                //console.log(action)
                //console.log('omg2')

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
        }

        it.skip('Fresh Drag Already in clean state', () => {
        })

        it.skip('Fresh Drag clean state', () => {
            expect(false).to.equal(true, 'No Tests Writen Yet')
        })
        it('Already in drag', () => {
            let test = {
                ...EditorStateDefault,
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
                nextNodeID: 0,
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
                ...EditorStateDefault,
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
                nextNodeID: 0,
                nodes: [
                    { x: 1, y: 0 },
                    { x: 9 + 6, y: 14 + 7 },
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
        for (let i = 0; i < 10; i++) {
            let ox = (Math.random() - 0.5) * 400
            let oy = (Math.random() - 0.5) * 400
            let sx = (Math.random() - 0.5) * 400
            let sy = (Math.random() - 0.5) * 400

            let mx = (Math.random() - 0.5) * 400
            let my = (Math.random() - 0.5) * 400

            it('should test ' + (i + 1), () => {
                let test = {
                    ...EditorStateDefault,
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: sx,
                        posStartY: sy,
                        posOffsetX: ox,
                        posOffsetY: oy,
                        posCurrentX: sx,
                        posCurrentY: sy,
                        nodeID: 2,
                        output: -1,
                        input: -1
                    },
                    nextNodeID: 0,
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
                    ...EditorStateDefault,
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: sx,
                        posStartY: sy,
                        posOffsetX: ox,
                        posOffsetY: oy,
                        posCurrentX: mx,
                        posCurrentY: my,
                        nodeID: 2,
                        output: -1,
                        input: -1,
                    } as MoveState,
                    nextNodeID: 0,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: mx + ox, y: my + oy },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                }
                let action = {
                    type: editorActionTypes.DRAG_NODE_MOVE,
                    pos: [mx, my]
                }

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
        }

        /*
                    node: node,
                    start: [sx, sy],
                    offset: [ox, oy],
                    targetType: MoveType.Node,
                    output: input == false ? connector : -1,
                    input: input ? connector : -1
                    */

        for (let i = 0; i < 10; i++) {
            let ox = (Math.random() - 0.5) * 400
            let oy = (Math.random() - 0.5) * 400
            let sx = (Math.random() - 0.5) * 400
            let sy = (Math.random() - 0.5) * 400

            let mx = (Math.random() - 0.5) * 400
            let my = (Math.random() - 0.5) * 400

            let input = Math.random() >= 0.5

            let node = Math.trunc((Math.random()) * 400)
            let connector = Math.trunc((Math.random()) * 400)

            it('should not move node if draging connector ' + (i + 1), () => {
                let test = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: sx,
                        posStartY: sy,
                        posOffsetX: ox,
                        posOffsetY: oy,
                        posCurrentX: sx,
                        posCurrentY: sy,
                        nodeID: node,
                        output: input == false ? connector : -1,
                        input: input ? connector : -1,
                    },
                    nextNodeID: 0,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault
                } as EditorState
                let target = {
                    nodeMoving: {
                        dragging: true,
                        type: MoveType.Node,
                        posStartX: sx,
                        posStartY: sy,
                        posOffsetX: ox,
                        posOffsetY: oy,
                        posCurrentX: mx,
                        posCurrentY: my,
                        nodeID: node,
                        output: input == false ? connector : -1,
                        input: input ? connector : -1,
                    } as MoveState,
                    nextNodeID: 0,
                    nodes: [
                        { x: 1, y: 0 },
                        { x: 24, y: 53 },
                        { x: 165, y: 12 },
                        { x: 23, y: 53 },
                        { x: 7, y: 151 },
                    ],
                    emulator: EmulatorStateDefault //TODO: Should change the node connection state
                } as EditorState
                let action = {
                    type: editorActionTypes.DRAG_NODE_MOVE,
                    pos: [mx, my]
                }

                let result = EditorReducer(test, action)
                expect(result).to.deep.equal(target)
            })
        }
    })
    describe('DRAG_NODE_STOP', () => {
        it('should move node on Success', () => {
            let test = {
                ...EditorStateDefault,
                nodeMoving: {
                    dragging: true,
                    type: MoveType.Node,
                    posStartX: 9,
                    posStartY: 14,
                    posOffsetX: 6,
                    posOffsetY: 7,
                    posCurrentX: 12,
                    posCurrentY: 15,
                    nodeID: 4,
                    output: -1,
                    input: -1
                },
                nextNodeID: 0,
                nodes: [
                    { x: 1, y: 0 },
                    { x: 24, y: 53 },
                    { x: 23, y: 53 },
                    { x: 7, y: 151 },
                    { x: 165, y: 12 },
                ],
                emulator: EmulatorStateDefault
            }
            let target = {
                ...EditorStateDefault,
                nodeMoving: MoveStateDefault,
                nextNodeID: 0,
                nodes: [
                    { x: 1, y: 0 },
                    { x: 24, y: 53 },
                    { x: 23, y: 53 },
                    { x: 7, y: 151 },
                    { x: 812 + 6, y: 234 + 7 },
                ],
                emulator: EmulatorStateDefault
            }
            let action = {
                type: editorActionTypes.DRAG_NODE_STOP,
                pos: [812, 234],
                success: true
            }

            let result = EditorReducer(test, action)
            expect(result).to.deep.equal(target)
        })
        it('should return node on Failed', () => {
            let test = {
                ...EditorStateDefault,
                nodeMoving: {
                    dragging: true,
                    type: MoveType.Node,
                    posStartX: 9,
                    posStartY: 14,
                    posOffsetX: 6,
                    posOffsetY: 7,
                    posCurrentX: 12,
                    posCurrentY: 15,
                    nodeID: 3,
                    output: -1,
                    input: -1
                },
                nextNodeID: 0,
                nodes: [
                    { x: 1, y: 0 },
                    { x: 24, y: 53 },
                    { x: 23, y: 53 },
                    { x: 165, y: 12 },
                    { x: 7, y: 151 },
                ],
                emulator: EmulatorStateDefault
            }
            let target = {
                ...EditorStateDefault,
                nodeMoving: MoveStateDefault,
                nextNodeID: 0,
                nodes: [
                    { x: 1, y: 0 },
                    { x: 24, y: 53 },
                    { x: 23, y: 53 },
                    { x: 9 + 6, y: 14 + 7 },
                    { x: 7, y: 151 },
                ],
                emulator: EmulatorStateDefault
            }
            let action = {
                type: editorActionTypes.DRAG_NODE_STOP,
                pos: [632, 145],
                success: false
            }

            let result = EditorReducer(test, action)
            expect(result).to.deep.equal(target)
        })
        it.skip('should connect nodes when end is successful and input or output is set', () => {
            expect(false).to.be.true
        })
    })
})
