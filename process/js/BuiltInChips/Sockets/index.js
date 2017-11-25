const MyEditor = require('../../includes/MyEditor')

module.exports = {
  Bus: new D3NE.Socket("bus", "n Bit Bus Socket", "hint"),
  Bit: new D3NE.Socket("bit", "1 Bit Socket", "hint"),
  Null: new D3NE.Socket("null-socket", "Null Socket", "hint")
}
