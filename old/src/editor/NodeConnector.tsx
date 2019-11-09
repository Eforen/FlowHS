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
import { makeActionHoverStart, makeActionHoverEnd } from './actions/hoverActions';

export interface INodeConnectorProps {
    store: Store<EditorState>
    nodeId: number
    id: number
    nodeData: NodeState
    input: boolean
    editorRootOffset: {
        x: number
        y: number
    }
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
    hovering: boolean
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
            },
            hovering: this.getThisHovering()
        }
    }

    public getThisHovering(): boolean{
        return this.props.store.getState().hover.hovering.reduce<boolean>((last, hover) => {
            if (last === true) {
                return true
            }
            //console.log('((' + hover.input.toString() + ' == ' + this.props.input.toString() + ')==' + (hover.input == this.props.input).toString() + ' && (' + hover.node.toString() + ' == ' + this.props.nodeId.toString() + ')==' + (hover.node == this.props.nodeId).toString() + ' && (' + hover.connector.toString() + ' == ' + this.props.id.toString() + ')==' + (hover.connector == this.props.id).toString() + ')==' + (hover.input == this.props.input && hover.node == this.props.nodeId && hover.connector == this.props.id).toString())
            return hover.input == this.props.input && hover.node == this.props.nodeId && hover.connector == this.props.id
        }, false)
    }

    public render() {
        let onMouseUp = (event: any) => {
            console.log('onMouseUp Correct')
            //console.log(event)
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
            console.log('onMouseMove Correct')
            //console.log(event)
            this.props.store.dispatch(makeActionDragMove(event.clientX, event.clientY))
        }

        let onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
            let boundingBox = event.currentTarget.getBoundingClientRect()
            //console.log('MouseDown Start')
            //console.log({ w: this.props.editorRootOffset.x + boundingBox.right, h: this.props.editorRootOffset.y + boundingBox.bottom})
            //console.log('MouseDown Done')
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            this.props.store.dispatch(makeActionDragConnectorStart(
                this.props.nodeId,
                [(this.props.input ? boundingBox.left : boundingBox.right), boundingBox.top + ((boundingBox.bottom - boundingBox.top) / 2)],
                [
                    //this.props.editorRootOffset.x,
                    //this.props.editorRootOffset.y
                    this.props.editorRootOffset.x,
                    this.props.editorRootOffset.y
                ],
                this.props.input,
                this.props.id
            ))
        }

        let onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
            this.props.store.dispatch(makeActionHoverStart(
                this.props.nodeId,
                this.props.input,
                this.props.id
            ))
        }

        let onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
            this.props.store.dispatch(makeActionHoverEnd(
                this.props.nodeId,
                this.props.input,
                this.props.id
            ))
        }

        if (this.props.store.getState().nodeMoving.nodeID == this.props.id &&
            this.props.store.getState().nodeMoving.input == -1 &&
            this.props.store.getState().nodeMoving.output == -1) {
            //classes += ' dragging'
        }

        let classN = this.state.hovering ? 'hover' : 'normal'

        //console.log('Really what the actual fuck!')
        return (
            <li style= {{ height: '1em' }} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classN}>
                <span className='logicnode-connector' ref={'node' + this.props.nodeId + (this.props.input ? 'input' : 'output') + this.props.id + 'connector'}> </span>
                <span className='logicnode-connector-label' > {
                    this.props.input ?
                    this.props.nodeData.inputs[this.props.id].name :
                    this.props.nodeData.outputs[this.props.id].name } </span>
            </li>)
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
            let hovering = this.getThisHovering()
            if (this.state.hovering != hovering) {
                this.setState({
                    ...this.state,
                    hovering: hovering
                })
            }
        })
    }
}