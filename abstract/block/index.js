var getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon');

class Neon_block_abstract {
  constructor(block){
    this.name = block.name;
    this.content = {};
    this.request = context.get('request');
    this.response = context.get('response');
  }

}

module.exports = Neon_block_abstract;
