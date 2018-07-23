var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'neon/abstract/model')),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    compareHash = Neon.getFile('app/helper/handlePassword').compareHash;

class Neon_model_login extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;

    if(this.request.user){
      self.successAction(this.request.user);
    } else {
      self.failureAction('User is not logged in');
    }
  }

  successAction(user){
    var userData = {
      id: user.id,
      username: user.username,
      admin: user.admin
    }
    this.response.send(userData);
  }

  failureAction(err){
    this.response.status(403).send({error: err});
  }

}

module.exports = Neon_model_login;
