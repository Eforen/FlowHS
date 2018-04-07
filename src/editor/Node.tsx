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
        let connectorList = []
        connectorList.push(this.props.logic.InputConnectors.map((input: Connector) => {
                return (<li>{input.name}</li>)
            })
        )
        connectorList.push(this.props.logic.OutputConnectors.map((output: Connector) => {
                return (<li>{output.name}</li>)
            })
        )

        let connectors = (<div className='connectors'>{connectorList}</div>)

        return (
            <div>
                <section className={'logicNode logicNode-' + this.props.logic.name}>
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