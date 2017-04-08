var path = require('path'),
    passport = require('passport');
var Neon_abstract = require(path.join(appRoot,'abstract/module'));

class Neon_admin extends Neon_abstract {
  constructor(){
    super();
    this.name = "Neon_admin";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.init();
  }

  /*
  ** Module Init
  */
  init(){
    var self = this;
    console.log(self.name+' Initiates');
  }
}

module.exports = Neon_admin;
