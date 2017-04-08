var path = require('path'),
    async = require('async'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class settingsCategorizer extends abstract {
  constructor(db){
    super(db);
  }
  outputCategoryTree(categories, callback){
    var self = this;
    var categoryArray = [];
    async.eachSeries(categories, function(category, asyncCallback){
      category.getChildren().then(function(children){
        if(children.length > 0){
          self.outputCategoryTree(children, function(childrenCategories){
            categoryArray.push(category);
            categoryArray.push.apply(categoryArray, childrenCategories);
            asyncCallback();
          });
        } else {
          categoryArray.push(category);
          asyncCallback();
        }
      });
    }, function(){
      callback(categoryArray);
    });
  }
  getCategories(request, callback){
    var self = this;
    self.models.category.findAll({where: {parentId: null}, order: [['sorting','asc'],['id','asc']],modelInclude: true}).then(function(categories){
      self.outputCategoryTree(categories, function(categoryTree){
        callback(categoryTree);
      });
    });
  }
}

module.exports = function(request, response, callback){
  var settingsCategorizerInstance = new settingsCategorizer(db);
  settingsCategorizerInstance.getCategories(request, function(data){
    callback(data);
  });
}
