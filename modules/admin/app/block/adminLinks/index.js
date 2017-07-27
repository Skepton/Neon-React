var path = require('path'),
    pathToRegexp = require('path-to-regexp'),
    getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon'),
    Neon_block_html = Neon.getFile('app/block/html');


class Neon_block_admin_links extends Neon_block_html {
  constructor(block){
    super(block);
    this.links = block.links;
    this.init();
  }

  init(){
    var path = pathToRegexp(context.get('route'));
    this.links.forEach(function(link){
      if(path.exec(link.link)){
        link.active = true;
      }
    });
    this.setContent('links', this.links);
  }

}

module.exports = Neon_block_admin_links;
