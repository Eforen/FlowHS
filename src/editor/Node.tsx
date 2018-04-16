import * as React from 'react';
import Gate from '../emulator/Gate';
import Connector from '../emulator/Connector';

export interface INodeProps{
    logic: Gate
    pos: {
        x: number,
        y: number
    }
}

export interface INodeState {
    gate: Gate
}

export class Node extends React.Component<INodeProps, INodeState>{
    constructor(props: any){
        super(props)

        this.state = { gate: this.props.logic }
    }

    public render() {
        let connectorListInputs = []
        let connectorListOutputs = []
        connectorListInputs.push(this.props.logic.InputConnectors.map((input: Connector) => {
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

        connectorListOutputs.push(this.props.logic.OutputConnectors.map((output: Connector) => {
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
                    height: this.props.logic.InputConnectors.length > this.props.logic.OutputConnectors.length ? 
                    (this.props.logic.InputConnectors.length + '.2em') : 
                    (this.props.logic.OutputConnectors.length + '.2em')
                }}>
                {inputList}
                {outputList}
            </div>)

        return (
            <div>
                <section className={'logicnode logicnode-' + this.props.logic.name}>
                    <header className='logicnode-header'>
                        <span className='logicnode-title'>{this.props.logic.name}</span>
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