var ex = {
  AND: require('./AND'),
  //OR Gate
  //OR: require('./OR'),
  //NOT Gate
  //NOT: require('./NOT'),
  //NAND Gate
  //NAND: require('./NAND'),
  //NOR Gate
  //NOR: require('./NOR'),
  //XOR Gate
  //XOR: require('./XOR'),
  //XNOR Gate
  //XNOR: require('./XNOR')
  all: []
}

ex.all.push(ex.AND)
//ex.all.push(ex.OR)
//ex.all.push(ex.NOT)
//ex.all.push(ex.NAND)
//ex.all.push(ex.NOR)
//ex.all.push(ex.XOR)
//ex.all.push(ex.XNOR)
module.exports = ex
