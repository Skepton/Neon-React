var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model')),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    compareHash = Neon.getFile('/handlePassword').compareHash;

class Neon_model_login extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;

    this.modelData = {
      "username": this.request.body.username.toLowerCase(),
      "password": this.request.body.password
    }
    this.loginSetup();

    self.authenticate(function(user, err){
        if(user && !err) {
          self.successAction();
        } else {
          self.failureAction(err);
        }
    });
  }

  loginSetup(){
    var self = this;
    passport.use(new LocalStrategy(self.modelData, function(username, password, callback) {
    	username = username.toLowerCase();
    	self.schemas.user.findOne({where: {username: username}}).then(function(user){
    		if (!user) {
          callback(false, 'User not found!');
        } else {
          compareHash(password, user.password, function(compare){
            if(!compare){
              callback(null, 'Wrong password!');
            } else {
              callback(user, false);
            }
          });
        }
    	});
    }));
  }

  authenticate(callback){
    var self = this;
    passport.authenticate('local', function(user, err) {
      if (err || !user) {
        callback(user, err);
      } else {
        self.request.logIn(user, function(err) {
          if (err) {
            callback(user, err);
          } else {
            callback(user, false);
          }
        });
      }
    })(self.request);
  }

  successAction(){
    this.request.flash('notice', 'Login Successful');
    this.response.redirect('/');
  }

  failureAction(err){
    this.request.flash('error', err);
    this.response.redirect('/login');
  }

}

module.exports = Neon_model_login;
