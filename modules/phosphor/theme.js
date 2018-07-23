var path = require('path');
var Neon_module_abstract = require(path.join(appRoot,'neon/abstract/module'));

class Neon_phosphor_theme extends Neon_module_abstract {
  constructor(){
    super();
    this.name = "Neon_phosphor_theme";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
  }
}

module.exports = Neon_phosphor_theme;
