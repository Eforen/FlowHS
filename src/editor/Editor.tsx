import * as React from 'react';
import Gate from '../emulator/Gate';
import GateAND from '../emulator/Builtin/GateAND';
import { Node } from './Node'
import DragTypes from './DragTypes';

export class Editor extends React.Component<{}, {}> {
    render() {
        let gate: Gate = new GateAND()
        return (
            <div className='ChipEditorGrid'>
                <Node logic={gate} pos={{x: 0, y: 0}}/>
            </div>
        );
    }
}
