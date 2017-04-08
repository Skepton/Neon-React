var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    async = require('async'),
    abstract = fallback('@model/abstract');

class composer extends abstract {
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
  getPost(request, callback){
    var self = this, data;
    var hashid = request.params.hashid;
    self.models.post.findOne({where: {hashid: hashid}}).then(function(post){
        callback(post);
    });
  }
}

module.exports = function(request, response, callback){
  var composerInstance = new composer(db);
  composerInstance.getPost(request, function(post){
    composerInstance.getCategories(request, function(categoryTree){
      callback({"post": post, "categoryTree": categoryTree});
    });
  });
}
