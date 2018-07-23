var resolve = require('path').resolve,
    events = require('events');

class Neon_module_abstract {
  constructor(){
    this.name = "Neon_module_abstract";
    this.version = "0.0.1";
    this.events = new events();
    this.parent = false;
    this.setPath(resolve(__dirname));
  }

  setPath(path){
    this.path = path;
  }

  getPath(){
    return this.path;
  }

  setParent(parent){
    var parentTheme = Neon.require(path.join(appRoot,'./modules/', parent, 'theme.js'));
    this.parent = new parentTheme();
  }

  getParent(){
    return this.parent;
  }
}

module.exports = Neon_module_abstract;
