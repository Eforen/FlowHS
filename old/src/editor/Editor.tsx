import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Gate from '../emulator/Gate';
import { Node } from './Node'
import DragTypes from './DragTypes';
import { Store } from 'react-redux';
import { EditorState } from './state/editorState';
import { SVGComponent } from './SVGComponent';
import { SVGSpline } from './SVGSpline';

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

        let dragging = undefined
        if (state.nodeMoving.dragging && state.nodeMoving.input > -1) {
            dragging = <SVGSpline 
                start={{ x: state.nodeMoving.posCurrentX - state.nodeMoving.posOffsetX, y: state.nodeMoving.posCurrentY - state.nodeMoving.posOffsetY }} 
                end={{ x: state.nodeMoving.posStartX - state.nodeMoving.posOffsetX, y: state.nodeMoving.posStartY - state.nodeMoving.posOffsetY}}
            />
        }

        if (state.nodeMoving.dragging && state.nodeMoving.output > -1) {
            dragging = <SVGSpline 
                start={{ x: state.nodeMoving.posStartX - state.nodeMoving.posOffsetX, y: state.nodeMoving.posStartY - state.nodeMoving.posOffsetY }} 
                end={{ x: state.nodeMoving.posCurrentX - state.nodeMoving.posOffsetX, y: state.nodeMoving.posCurrentY - state.nodeMoving.posOffsetY }}
            />
        }

        return (
            <div className='ChipEditorGrid' ref='EditorNodeFrame'>
                <span style={{zIndex: 11}}>
                {nodes}
                </span>
                <SVGComponent height='100%' width='100%' ref='svgComponent' style={{ zIndex: 10 }}>
                    {dragging}
                </SVGComponent>
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
