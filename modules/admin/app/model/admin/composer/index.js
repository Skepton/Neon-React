var path = require('path'),
    async = require('async'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_composer extends Neon_model_abstract {
  constructor(){
    super();
  }

  getData(callback){
    var self = this;
    self.getPost(function(post){
      self.getCategories(function(categoryTree){
        callback({"post": post, "categoryTree": categoryTree});
      });
    });
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

  getCategories(callback){
    var self = this;
    self.schemas.category.findAll({where: {parentId: null}, order: [['sorting','asc'],['id','asc']],modelInclude: true}).then(function(categories){
      self.outputCategoryTree(categories, function(categoryTree){
        callback(categoryTree);
      });
    });
  }

  getPost(callback){
    var self = this, data;
    var hashid = self.request.params.hashid;
    self.schemas.post.findOne({where: {hashid: hashid}}).then(function(post){
        callback(post);
    });
  }
}

module.exports = Neon_model_composer;
