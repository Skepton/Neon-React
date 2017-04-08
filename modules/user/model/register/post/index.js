var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_register extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;
    self.processRequest();
    self.generateUser(function(user, err){
      console.log(user, err);
      if(user && !err) {
        self.successAction();
      } else {
        self.failureAction(err);
      }
    });
  }

  processRequest(){
    var requestParams = this.request.body;
    this.modelData = {
      "admin": false,
      "username": requestParams.username,
      "password": requestParams.password,
      "about": ""
    }
  }

  generateUser(callback){
    this.schemas.user.create(this.modelData).then(function(user){
      callback(user, undefined);
    }).catch(function(err){
      callback(undefined, err);
    });
  }

  successAction(){
    this.response.redirect('/login');
  }

  failureAction(errors){
    var errorMsg = '';
    errors.errors.forEach(function(error){
      errorMsg += error.message;
    });
    this.request.flash('error',errorMsg);
    this.response.redirect('/register');
  }

}

module.exports = Neon_model_register;
