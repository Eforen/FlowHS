import * as React from 'react';
import Gate from '../emulator/Gate';
import { Node } from './Node'
import DragTypes from './DragTypes';
import { Store } from 'react-redux';
import { EditorState } from './state/editorState';

export interface Props {
    store: Store<EditorState>
}

export interface State {

}

export class Editor extends React.Component<Props, State> {
    render() {
        //let gate: Gate = new GateAND()
        let state = this.props.store.getState()

        console.log(state)
        let nodes = state.nodes.map((value, index, arr) => {
            return (<Node key={index} id={index} nodeData={state.emulator.nodes[index]} pos={{ x: value.x, y: value.y }} />)
        })
        console.log(nodes)

        return (
            <div className='ChipEditorGrid'>
                {nodes}
            </div>
        );
    }
}
