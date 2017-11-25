var $ = jQuery = require('jquery')
module.exports = (self, bit) => {
  if(bit){
    $(self.el).addClass("value-bit-high")
    $(self.el).removeClass("value-bit-low")
  } else{
    $(self.el).addClass("value-bit-low")
    $(self.el).removeClass("value-bit-high")
  }
}
