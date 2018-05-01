import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Gate from '../emulator/Gate';
import { Node } from './Node'
import DragTypes from './DragTypes';
import { Store } from 'react-redux';
import { EditorState } from './state/editorState';

export interface Props {
    store: Store<EditorState>
}

export interface State {
    x: number
    y: number
    change: number
}

export class Editor extends React.Component<Props, State> {
    
    constructor(){
        super()

        this.state = {
            x: 0,
            y: 0,
            change: 0
        }
    }
    
    render() {
        //let gate: Gate = new GateAND()
        let state = this.props.store.getState()

        console.log(state)
        let nodes = state.nodes.map((value, index, arr) => {
            return (
                <Node 
                    store={this.props.store}
                    key={index}
                    id={index}
                    nodeData={state.emulator.nodes[index]}
                    editorRootOffset={{ x: this.state.x, y: this.state.y }}
                    pos={{ x: value.x, y: value.y }}
                />
            )
        })
        console.log(nodes)
        
        return (
            <div className='ChipEditorGrid' ref='EditorNodeFrame'>
                {nodes}
            </div>
        );
    }
    
    componentDidMount(){
        let editorBase = findDOMNode(this.refs['EditorNodeFrame'])
        let editorPos = editorBase.getBoundingClientRect()
        console.log(editorPos)

        this.setState({ x: editorPos.left, y: editorPos.top, change: 0})
        this.props.store.subscribe(() => {
            let editorBase = findDOMNode(this.refs['EditorNodeFrame'])
            let editorPos = editorBase.getBoundingClientRect()
            this.setState({ x: editorPos.left, y: editorPos.top, change: this.state.change + 1 })
        })
    }
}
