import * as React from 'react';
import Gate from './emulator/Gate';
import { Editor } from './editor/Editor'
import { createStore } from 'redux';
import { EditorState } from './editor/state/editorState';
import { EditorReducer } from './editor/reducers/EditorReducer';
import { nodeCreate, IActionNodeCreate } from './editor/actions/nodeCreate';
import { LogicTypes } from './emulator/state/nodeTypes';
import { Store } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Dispatch } from 'redux';

export interface Props {
}

export interface State {

}

declare global {
  interface Window {
    store: Store<EditorState>
    makeAction: {
      create: (type: LogicTypes, x: number, y: number) => IActionNodeCreate
    }
    dispatch: Dispatch<EditorState>
   }
}

//const store = createStore<EditorState>(EditorReducer);
const store: Store<EditorState> = createStore(EditorReducer, applyMiddleware(thunk, logger))

window.store = store
window.makeAction = {
  create: nodeCreate
}
window.dispatch = store.dispatch

//store.dispatch(nodeCreate(LogicTypes.BIT_INPUT, 30, 40))
//store.dispatch(nodeCreate(LogicTypes.BIT_INPUT, 30, 140)) //Not implimented
store.dispatch(nodeCreate(LogicTypes.BIT_AND, 180, 60))
store.dispatch(nodeCreate(LogicTypes.BIT_OR, 360, 60))
//store.dispatch(nodeCreate(LogicTypes.BIT_OUTPUT, 540, 60))

export class App extends React.Component<Props, State> {
  render() {
    return (
        <div>
          <h2>Welcome FlowHS!</h2>
          <Editor store={store}/>
        </div>
    );
  }
}
