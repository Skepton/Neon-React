var path = require('path'),
    Neon_block_html = Neon.getFile('/block/html');


class Neon_block_flash extends Neon_block_html {
  constructor(block){
    super(block);
    this.content = {};
    this.setMessages();
  }

  setMessages(){
    var error = this.request.flash('error');
    var notice = this.request.flash('notice');
    if(error.length > 0){
      this.content.errorMessage = error;
    }
    if(notice.length > 0){
      this.content.noticeMessage = notice;
    }
  }

}
module.exports = Neon_block_flash;
