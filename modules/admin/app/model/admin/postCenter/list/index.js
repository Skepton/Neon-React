var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_post_list extends Neon_model_abstract {
  constructor(){
    super();
  }

  getData(callback){
    var self = this;
    this.schemas.post.findAll({ limit: 10, order: '"createdAt" DESC'}).then(function(posts){
      callback(posts);
    });
  }
}

module.exports = Neon_model_post_list;
