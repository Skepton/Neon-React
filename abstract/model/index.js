var getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon');

class Neon_block_abstract {

  constructor(){
    this.schemas = Neon.getModule('Neon_db').schemas;
    this.request = context.get('request');
    this.response = context.get('response');
  }

  successAction(){
    this.request.flash('notice', 'Success Message!');
    this.response.redirect('/');
  }

  failureAction(error){
    this.request.flash('error', error);
    this.response.redirect('/');
  }

}

module.exports = Neon_block_abstract;
