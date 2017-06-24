var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_categorizer_add extends Neon_model_abstract {
  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;
    self.modelData = self.request.body;
    self.save(function(category, err){
      if(category && !err) {
        self.successAction();
      } else {
        self.failureAction(err);
      }
    });
  }

  save(callback){
    var self = this;
    var parentCategory = self.request.params.parentCategory === 'root' ? null : self.request.params.parentCategory;
    self.schemas.category.create(self.modelData).then(function(category){
      if(category){
        if(parentCategory){
          self.schemas.category.findOne({where: {id: parentCategory}}).then(function(parent){
            parent.addChildren(category);
            callback(category, undefined);
          });
        } else {
          callback(category, undefined);
        }
      }
    }).catch(function(err){
      callback(undefined, err);
    });
  }

  successAction(){
    this.request.flash('notice', 'Category saved successful!');
    this.response.redirect('/admin/settings/categorizer');
  }

  failureAction(err){
    this.request.flash('error', 'Error saving category!');
    this.response.redirect('/admin/settings/categorizer');
  }
}

module.exports = Neon_model_categorizer_add;
