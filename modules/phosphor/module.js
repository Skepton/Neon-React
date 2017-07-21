var path = require('path');
var Neon_module_abstract = require(path.join(appRoot,'abstract/module'));

class Neon_phosphor_module extends Neon_module_abstract {
  constructor(){
    super();
    this.name = "Neon_phosphor_module";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.init();
    this.isThemeModule = true;
  }

  /*
  ** Module Init
  */
  init(){
    console.log(this.name+' Initiates');
  }
}

module.exports = Neon_phosphor_module;
