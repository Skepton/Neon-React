var path = require('path'),
    Neon_block_abstract = require(path.join(appRoot,'abstract/block'));


class Neon_page_list extends Neon_block_abstract {

  constructor(block){
    super(block);
    this.isOutputBlock = block.output ? true : false;
    this.blocks = block.blocks;
    this.setContent(block.content);
  }

  setContent(key, content){
    this.content[key] = content;
  }

  render(callback){
    var self = this, html = '';

    if(self.content){
      for(var key in self.content.childBlock){
        html += self.content.childBlock[key];
      }
    }
    callback(html);
  }

}

module.exports = Neon_page_list;
