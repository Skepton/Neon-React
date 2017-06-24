var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_user extends Neon_model_abstract {

  constructor(){
    super();
  }

  getData(){
    var self = this;
    return new Promise(function(resolve,reject){
      var params = self.request.params;
      self.schemas.user.findOne({where: {username: params.user}}).then(function(user){
        var data = {
          'username': user.displayname
        }
        resolve(data);
      });
    });
  }

}

module.exports = Neon_model_user;
