var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class composerSave extends abstract {
  constructor(db, request){
    super(db, request);
  }

  savePost(callback){
    var self = this;
    var hashid = self.request.params.hashid;
    var postBody = self.request.body;
    var category = self.request.body.category;
    self.models.post.update(postBody,{where: {hashid: hashid}}).then(function(post){
      if(post){
        if(category){
          self.models.category.findOne({where: {id: category}}).then(function(category){
            if(category){
              category.addPost(post);
              callback(false);
            } else {
              callback(true);
            }
          });
        } else {
          self.models.post.findById(post[0]).then(function(post){
            post.getCategory().then(function(category){
              category.removePost(post);
            });
          });
          callback(false);
        }
      } else {
        callback(true);
      }
    });
  }
  successAction(request, response){
    request.flash('notice', 'Post saved successful!');
    response.redirect('/admin');
  }

  failureAction(request, response, error){
    request.flash('error', 'Error saving post!');
    response.redirect('/admin');
  }
}

module.exports = function(request, callback){
  var composerSaveInstance = new composerSave(db, request);
  composerSaveInstance.savePost(function(data){
    callback(composerSaveInstance, data);
  });
}
