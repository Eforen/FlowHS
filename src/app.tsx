import * as React from 'react';
import Gate from './emulator/Gate';
import GateAND from './emulator/Builtin/GateAND';
import { Editor } from './editor/Editor'

export class App extends React.Component<undefined, undefined> {
  render() {
    let gate: Gate = new GateAND()
    return (
      <div>
        <h2>Welcome to React with Typescript!</h2>
        <Editor />
      </div>
    );
  }
}
