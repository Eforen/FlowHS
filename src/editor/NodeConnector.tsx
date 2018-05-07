import * as React from 'react';
import Gate from '../emulator/Gate';
import Connector from '../emulator/Connector';
import { NodeState } from '../emulator/state/nodeState';
import { InputState } from '../emulator/state/inputState';
import { OutputState } from '../emulator/state/outputState';
import { Store } from 'redux';
import { EditorState } from './state/editorState';
import { makeActionDragNodeStart, makeActionDragMove, makeActionDragStop, makeActionDragConnectorStart } from './actions/dragActions';
import { findDOMNode } from 'react-dom';

export interface INodeConnectorProps {
    store: Store<EditorState>
    nodeId: number
    id: number
    nodeData: NodeState
    input: boolean
}

export interface INodeConnectorState {
    nodeData: NodeState
    sizes: {
        connectors: {
            width: number
            height: number
        }
        inputs: {
            width: number
            height: number
        }
        outputs: {
            width: number
            height: number
        }
    }
}

export class NodeConnector extends React.Component<INodeConnectorProps, INodeConnectorState>{
    constructor(props: any) {
        super(props)

        this.state = {
            nodeData: this.props.nodeData,
            sizes: {
                connectors: {
                    width: 0,
                    height: 0
                },
                inputs: {
                    width: 0,
                    height: 0
                },
                outputs: {
                    width: 0,
                    height: 0
                }
            }
        }
    }

    public render() {
        let onMouseUp = (event: any) => {
            console.log('onMouseUp')
            console.log(event)
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.props.store.dispatch(makeActionDragStop(event.clientX, event.clientY, true))
            this.setState(
                {
                    ...this.state,
                    nodeData: this.props.store.getState().emulator.nodes[this.props.id]
                }
            )
        }

        let onMouseMove = (event: any) => {
            console.log('onMouseMove')
            console.log(event)
            this.props.store.dispatch(makeActionDragMove(event.clientX, event.clientY))
        }

        let onMouseDown = (event: any) => {
            console.log('MouseDown')
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            this.props.store.dispatch(makeActionDragConnectorStart(
                this.props.id,
                [event.clientX, event.clientY],
                [
                    event.clientX,
                    event.clientY
                ],
                this.props.input,
                this.props.id
            ))
        }

        if (this.props.store.getState().nodeMoving.nodeID == this.props.id &&
            this.props.store.getState().nodeMoving.input == -1 &&
            this.props.store.getState().nodeMoving.output == -1) {
            //classes += ' dragging'
        }

        return (
            <li style= {{ height: '1em' }} onMouseDown={onMouseDown}>
                <span className='logicnode-connector' > </span>
                <span className='logicnode-connector-label' > {
                    this.props.input ?
                    this.props.nodeData.inputs[this.props.id].name :
                    this.props.nodeData.outputs[this.props.id].name } </span>
            </li>)
    }
}