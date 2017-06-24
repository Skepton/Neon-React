var path = require('path'),
    Neon_block_abstract = require(path.join(appRoot,'abstract/block')),
    nunjucks = require(path.join(appRoot,'toolkit','nunjucksExtended.js'));

class Neon_page_html extends Neon_block_abstract {

  constructor(block){
    super(block);
    this.isOutputBlock = block.output ? true : false;
    this.blocks = block.blocks;
    this.setTemplate(block.template);
  }

  setTemplate(template){
    this.template = template;
  }

  setContent(key, content){
    this.content[key] = content;
  }

  render(callback){
    var self = this;
    nunjucks.render(Neon.getFilePath('pub/view/'+self.template), self.content, function(err, html){
      if(err){console.log(err);}
      if(self.isOutputBlock){
        self.response.send(html);
        callback();
      } else {
        callback(html);
      }
    });

  }

}

module.exports = Neon_page_html;
