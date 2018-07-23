var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'neon/abstract/model'));

class Neon_model_register extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;
    self.processRequest();
    self.generateUser().then(function(user){
        self.successAction(user);
    }, function(err){
        self.failureAction(err);
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

  generateUser(){
    var self = this;
    return new Promise(function(resolve, reject) {
      self.schemas.user.create(self.modelData).then(function(user){
        resolve(user);
      }).catch(function(err){
        reject(err);
      });
    });
  }

  successAction(){
    this.request.flash('notice','Account successfully created!');
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
