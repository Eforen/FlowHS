import * as React from 'react';
import Gate from '../emulator/Gate';
import Connector from '../emulator/Connector';
import { NodeState } from '../emulator/state/nodeState';
import { InputState } from '../emulator/state/inputState';
import { OutputState } from '../emulator/state/outputState';
import { Store } from 'redux';
import { EditorState } from './state/editorState';
import { makeActionDragNodeStart, makeActionDragMove, makeActionDragStop } from './actions/dragActions';

export interface INodeProps{
    store: Store<EditorState>
    id: number
    nodeData: NodeState
    pos: {
        x: number,
        y: number
    }
    editorRootOffset: {
        x: number,
        y: number
    }
}

export interface INodeState {
    nodeData: NodeState
}

export class Node extends React.Component<INodeProps, INodeState>{
    constructor(props: any){
        super(props)

        this.state = { nodeData: this.props.nodeData }
    }

    public render() {
        let connectorListInputs = []
        let connectorListOutputs = []
        connectorListInputs.push(this.props.nodeData.inputs.map((input: InputState) => {
            return (
                <li style={{height: '1em'}}>
                    <span className='logicnode-connector'></span>
                    <span className='logicnode-connector-label'>{input.name}</span>
                </li>
            )
        }))

        let inputList = (
            <div className='logicnode-inputs'>
                <ul className='connectorlist'>
                    {connectorListInputs}
                </ul>
            </div>
        )

        connectorListOutputs.push(this.props.nodeData.outputs.map((output: OutputState) => {
            return (
                <li style={{ height: '1em' }}>
                    <span className='logicnode-connector'></span>
                    <span className='logicnode-connector-label'>{output.name}</span>
                </li>
            )
            })
        )
        let outputList = (
            <div className='logicnode-outputs'>
                <ul className='connectorlist'>
                    {connectorListOutputs}
                </ul>
            </div>
        )

        let connectors = (
            <div className='connectors' 
                style={{ 
                    height: this.props.nodeData.inputs.length > this.props.nodeData.outputs.length ? 
                        (this.props.nodeData.inputs.length + '.2em') : 
                    (this.props.nodeData.outputs.length + '.2em')
                }}>
                {inputList}
                {outputList}
            </div>)

        let style = {
            posistion: 'absolute',
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

        return (
            <section style={style} className={'logicnode logicnode-' + this.props.nodeData.name} onMouseDown={onMouseDown}>
                <header className='logicnode-header'>
                    <span className='logicnode-title'>{this.props.nodeData.name}</span>
                </header>
                {connectors}
            </section>
        )
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