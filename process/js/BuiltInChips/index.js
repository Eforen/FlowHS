var ex = {
  Input: require('./Input'),
  Logic: require('./Logic'),
  Socket: require('./Sockets'),
  AllComponents: []
}

var addComps = (comps) => {
  for (var i = 0; i < comps.all.length; i++) {
    ex.AllComponents.push(comps.all[i])
  }
}

addComps(ex.Input)
addComps(ex.Logic)

module.exports = ex
