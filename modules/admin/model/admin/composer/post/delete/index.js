var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class composerDelete extends abstract {
  constructor(db, request){
    super(db, request);
  }

  deletePost(callback){
    var self = this;
    var hashid = self.request.params.hashid;
    var postBody = self.request.body;
    self.models.post.destroy({where: {hashid: hashid}}).then(function(post){
      if(post > 0){
        callback(false);
      } else {
        callback(true);
      }
    });
  }
  successAction(request, response){
    request.flash('notice', 'Post deleted successful!');
    response.redirect('/admin');
  }

  failureAction(request, response, error){
    request.flash('error', 'Error deleting post!');
    response.redirect('/admin');
  }
}

module.exports = function(request, callback){
  var composerDeleteInstance = new composerDelete(db, request);
  composerDeleteInstance.deletePost(function(data){
    callback(composerDeleteInstance, data);
  });
}
