var path = require('path'),
    async = require('async'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_categorizer extends Neon_model_abstract {
  constructor(){
    super();
  }

  outputCategoryTree(categories, callback){
    var self = this;
    var categoryTree = [];

    async.eachSeries(categories, function(category, asyncCallback){
      category.getChildren().then(function(children){
        if(children.length > 0){
          self.outputCategoryTree(children, function(childrenCategories){
            categoryTree.push({"id": category.id, "title": category.title, "children": childrenCategories});
            asyncCallback();
          });
        } else {
          categoryTree.push({"id": category.id, "title": category.title, "children": []});
          asyncCallback();
        }
      });
    }, function(){
      callback(categoryTree);
    });
  }

  getData(callback){
    var self = this;
    self.schemas.category.findAll({where: {parentId: null}, order: [['sorting','asc'],['id','asc']],modelInclude: true}).then(function(categories){
      self.outputCategoryTree(categories, function(categoryTree){
        callback(categoryTree);
      });
    });
  }
}

module.exports = Neon_model_categorizer;
