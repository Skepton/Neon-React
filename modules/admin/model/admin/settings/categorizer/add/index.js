var path = require('path'),
Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_categorizer_add extends Neon_model_abstract {
  constructor(){
    super();
  }
  getData(callback){
    callback({"id": this.request.params.parentCategory});
  }
}

module.exports = Neon_model_categorizer_add;
