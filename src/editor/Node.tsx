import * as React from 'react';
import Gate from '../emulator/Gate';
import Connector from '../emulator/Connector';
import { NodeState } from '../emulator/state/nodeState';
import { InputState } from '../emulator/state/inputState';
import { OutputState } from '../emulator/state/outputState';

export interface INodeProps{
    id: number
    nodeData: NodeState
    pos: {
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

        return (
            <div>
                <section className={'logicnode logicnode-' + this.props.nodeData.name}>
                    <header className='logicnode-header'>
                        <span className='logicnode-title'>{this.props.nodeData.name}</span>
                    </header>
                    {connectors}
                </section>
            </div>
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