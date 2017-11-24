class Output extends D3NE.Output {
  constructor(title, socket, defaultValue) {
    super(title, socket)
    this.value = defaultValue
  }
}

module.exports = Output
