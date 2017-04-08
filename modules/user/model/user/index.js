var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_user extends Neon_model_abstract {

  constructor(){
    super();
  }

  getData(callback){
    var params = this.request.params;
    this.schemas.user.findOne({where: {username: params.user}}).then(function(user){
      var data = {
        'username': user.displayname
      }
      callback(data);
    });
  }

}

module.exports = Neon_model_user;
