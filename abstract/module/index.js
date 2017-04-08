var resolve = require('path').resolve,
    events = require('events');

class Neon_module_abstract {
  constructor(){
    this.name = "Neon_module_abstract";
    this.version = "0.0.1";
    this.events = new events();
    this.setPath(resolve(__dirname));
  }

  setPath(path){
    this.path = path;
  }

  getPath(){
    return this.path;
  }
}

module.exports = Neon_module_abstract;
