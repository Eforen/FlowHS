import { expect } from 'chai';
import { describe } from 'mocha';
import { MoveState, MoveType, MoveStateDefault } from '../state/MoveState';
//import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { editorActionTypes } from '../actions/actionTypes';
import { NodeMoveReducer } from './NodeMoveReducer';
import { EditorNodeStateDefault } from '../state/EditorNodeState';
import { EditorReducer } from './EditorReducer';
import { EditorStateDefault, EditorState } from '../state/editorState';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { OutputTypes } from '../../emulator/state/outputTypes';
import { nodeCreate } from '../actions/nodeCreate';
import { makeActionDragConnectorStart } from '../actions/dragActions';


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
            nextNodeID: 0,
            nodes: [],
            emulator: {
                step: 0,
                sleepTime: 0,
                changed: false,
                nodes: [],
                updated: [],
                messages: []
            },
            hover: {
                hovering: []
            }
        } as EditorState

        let result = EditorReducer(EditorStateDefault, {type: editorActionTypes.NOP})
        expect(result).to.deep.equal(target)
    })

    require('./NodeMoverReducer.specinc')
    require('./NodeReducer.specinc')
    require('./HoverReducer.specinc')
})