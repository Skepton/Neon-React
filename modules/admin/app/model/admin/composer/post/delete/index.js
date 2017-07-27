var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_composer_delete extends Neon_model_abstract {
  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;

    self.deletePost(function(err){
      if(!err) {
        self.successAction();
      } else {
        self.failureAction(err);
      }
    });
  }

  deletePost(callback){
    var self = this;
    var hashid = self.request.params.hashid;
    var postBody = self.request.body;
    self.schemas.post.destroy({where: {hashid: hashid}}).then(function(post){
      if(post > 0){
        callback(false);
      } else {
        callback(true);
      }
    });
  }
  successAction(){
    this.request.flash('notice', 'Post deleted successful!');
    this.response.redirect('/admin');
  }

  failureAction(){
    this.request.flash('error', 'Error deleting post!');
    this.response.redirect('/admin');
  }
}

module.exports = Neon_model_composer_delete;
