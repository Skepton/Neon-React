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

  checkActiveCategory(links){
    var self = this;
    var path = pathToRegexp(context.get('route'));
    links.forEach(function(link){
      if(path.exec(link.link)){
        link.active = true;
      }
      if(typeof(link.links) !== 'undefined'){
        console.log(link.links);
        self.checkActiveCategory(link.links);
      }
    });
  }

  init(){
    this.checkActiveCategory(this.links);
    this.setContent('links', this.links);
  }

}

module.exports = Neon_block_admin_links;
