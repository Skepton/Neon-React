var path = require('path');
var Neon_module_abstract = require(path.join(appRoot,'neon/abstract/module'));

class Neon_page extends Neon_module_abstract {
  constructor(){
    super();
    this.name = "Neon_page";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.init();
  }

  /*
  ** Module Init
  */
  init(){
    console.log(this.name+' Initiates');
  }
}

module.exports = Neon_page;
