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
import { NodeConnector } from './NodeConnector';

export interface INodeProps{
    store: Store<EditorState>
    id: number
    nodeData: NodeState
    pos: {
        x: number
        y: number
    }
    editorRootOffset: {
        x: number
        y: number
    }
}

export interface INodeState {
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

export class Node extends React.Component<INodeProps, INodeState>{
    constructor(props: any){
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
        let connectorListInputs = []
        let connectorListOutputs = []
        let classes = 'logicnode logicnode-' + this.props.nodeData.name
        connectorListInputs.push(this.props.nodeData.inputs.map((input: InputState, index: number) => {
            return (
                <NodeConnector store={this.props.store} id={index} nodeId={this.props.id} nodeData={this.props.nodeData} input={true} />
            )
        }))
        
        let inputList = (
            <div className='logicnode-inputs'
                ref={'node' + this.props.id + 'inputs'}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0
                }}>
                <ul className='connectorlist'>
                    {connectorListInputs}
                </ul>
            </div>
        )
        
        connectorListOutputs.push(this.props.nodeData.outputs.map((output: OutputState, index: number) => {
            return (
                <NodeConnector store={this.props.store} id={index} nodeId={this.props.id} nodeData={this.props.nodeData} input={false} />
            )
        })
    )
    let outputList = (
        <div className='logicnode-outputs'
                ref={'node' + this.props.id + 'outputs'}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0
                    }}>
                <ul className='connectorlist'>
                    {connectorListOutputs}
                </ul>
            </div>
        )

        let connectors = (
            <div className='connectors' 
                style={{
                    minWidth: this.state.sizes.connectors.width,
                    minHeight: this.state.sizes.connectors.height,
                    position: 'relative'
                }}>
                {inputList}
                {outputList}
            </div>)

        let style = {
            position: 'absolute',
            left: this.props.pos.x,
            top: this.props.pos.y
        }



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
            console.log({ x: this.props.editorRootOffset.x, y: this.props.editorRootOffset.y })
            console.log({ x: event.clientX, y: event.clientY })
            console.log({ x: event.clientX - this.props.editorRootOffset.x, y: event.clientY - this.props.editorRootOffset.y })
            console.log({ x: event.pageX, y: event.pageY })
            console.log({ x: event.pageX - this.props.editorRootOffset.x, y: event.pageY - this.props.editorRootOffset.y })
            console.log({ x: event.screenX, y: event.screenY })
            console.log({ x: event.screenX - this.props.editorRootOffset.x, y: event.screenY - this.props.editorRootOffset.y })
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            this.props.store.dispatch(makeActionDragNodeStart(
                this.props.id,
                [event.clientX, event.clientY],
                [
                    (this.props.pos.x) - event.clientX,
                    (this.props.pos.y) - event.clientY //Little embaresed by this but not sure why I don'y need to add the editor offset...
                ]
            ))
        }

        if (this.props.store.getState().nodeMoving.nodeID == this.props.id &&
            this.props.store.getState().nodeMoving.input == -1 &&
            this.props.store.getState().nodeMoving.output == -1){
            classes += ' dragging'
        }

        return (
            <section style={style} className={classes}>
                <header className='logicnode-header' ref={'node' + this.props.id + 'header'} onMouseDown={onMouseDown}>
                    <span className='logicnode-title'>{this.props.nodeData.name}</span>
                </header>
                {connectors}
            </section>
        )
    }

    componentDidMount() {
        /*
        this.setState()
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
        */
        let calc = {
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
        let inputs = findDOMNode(this.refs['node' + this.props.id + 'inputs']);
        calc.inputs.width = inputs.getBoundingClientRect().width
        calc.inputs.height = inputs.getBoundingClientRect().height

        let outputs = findDOMNode(this.refs['node' + this.props.id + 'outputs']);
        calc.outputs.width = outputs.getBoundingClientRect().width
        calc.outputs.height = outputs.getBoundingClientRect().height

        //let headers = findDOMNode(this.refs['node' + this.props.id + 'header']);
        //calc.headers.width = headers.getBoundingClientRect().width
        //calc.headers.height = headers.getBoundingClientRect().height

        calc.connectors.width = calc.inputs.width + calc.outputs.width
        calc.connectors.height = Math.max( calc.inputs.height, calc.outputs.height)

        this.setState({
            ...this.state,
            sizes: calc
        })
        //if (
        //    this.state.sizes.connectors.height != calc.connectors.height
        //)
        console.log(calc)

        /*
        this.setState({ x: editorPos.left, y: editorPos.top, change: 0 })
        this.props.store.subscribe(() => {
            let editorBase = findDOMNode(this.refs['EditorNodeFrame'])
            let editorPos = editorBase.getBoundingClientRect()
            this.setState({ x: editorPos.left, y: editorPos.top, change: this.state.change + 1 })
        })
        */
    }
    /*
    render() {
        return (
            <div>
                <h2>Welcome to React with Typescript!</h2>
                <div className='ChipEditorGrid'>
                </div>
            </div>
        );
    }
    */
}