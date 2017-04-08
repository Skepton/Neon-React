var path = require('path'),
    Neon_block_html = Neon.getFile('/block/html');


class Neon_block_user_html extends Neon_block_html {
  constructor(block){
    super(block);
    this.init();
  }

  init(){
    this.setContent('user', this.request.user);
  }

}

module.exports = Neon_block_user_html;
