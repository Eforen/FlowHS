var ex = {
  Chip: require('./Chip'),
  Input: require('./Input'),
  Logic: require('./Logic'),
  Socket: require('./Sockets'),
  AllComponents: []
}

var addComps = (comps) => {
  for (var key in comps) {
    ex.AllComponents.push(comps[key])
  }
}

addComps(ex.Chip)
addComps(ex.Input)
addComps(ex.Logic)

module.exports = ex
