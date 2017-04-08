var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model')),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    compareHash = Neon.getFile('/handlePassword').compareHash;

class login extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;
    this.request.logout();
    self.successAction();
  }


  successAction(){
    this.request.flash('notice', 'You where successfully logged out!');
    this.response.redirect('/');
  }

}

module.exports = login;
