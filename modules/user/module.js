var path = require('path'),
    passport = require('passport');
var Neon_abstract = require(path.join(appRoot,'abstract/module'));

class Neon_user extends Neon_abstract {
  constructor(){
    super();
    this.name = "Neon_user";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.init();
  }

  /*
  ** Module Init
  */
  init(){
    var self = this;
    console.log(self.name+' Initiates');
    self.setupPassport();
    Neon.canary.on('neon:init_end', function(){
      self.setupUser();
    });
  }

  setupPassport(){
    Neon.app.use(passport.initialize()).use(passport.session());
  }

  setupUser(){
    passport.serializeUser(function(user, callback) {
      callback(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
      var schemas = Neon.getModule('Neon_database').schemas;
      schemas.user.findById(id).then(function(user){
        if (!user) {
          callback(null, false);
        } else {
          callback(null, user);
        }
      });
    });
  }
}

module.exports = Neon_user;
