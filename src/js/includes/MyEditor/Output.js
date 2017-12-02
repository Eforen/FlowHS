class Output extends D3NE.Output {
  constructor(title, socket, defaultValue, syncer) {
    super(title, socket)

    this.value = defaultValue
    this.syncer = syncer
  }

  getValue(){
    return this.value
  }
  setValue(value){
    this.syncer(this, value)
    this.value = value
  }
}

module.exports = Output
