var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class categorizerAdd extends abstract {
  constructor(db, request){
    super(db, request);
  }

  categorySave(callback){
    var self = this;
    var parentCategory = self.request.params.parentCategory === 'root' ? null : self.request.params.parentCategory;
    self.models.category.create(self.request.body).then(function(category){
      if(category){
        if(parentCategory){
          self.models.category.findOne({where: {id: parentCategory}}).then(function(parent){
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

  successAction(request, response){
    request.flash('notice', 'Category saved successful!');
    response.redirect('/admin/settings/categorizer');
  }

  failureAction(request, response, error){
    request.flash('error', 'Error saving category!');
    response.redirect('/admin/settings/categorizer');
  }
}

module.exports = function(request, callback){
  var categorizerAddInstance = new categorizerAdd(db, request);
  categorizerAddInstance.categorySave(function(data, err){
    callback(categorizerAddInstance, err);
  });
}
