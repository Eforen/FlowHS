import * as NodeEditor from '../../NodeEditor'

let Editor = Object.assign({}, NodeEditor, {
  Input: require('./Input'),
  Output: require('./Output'),
  Component: require('./Component'),
  Node: require('./Node'),
  Control: require('./Control'),
  ContextMenu: require('./ContextMenu')
})

export default Editor;