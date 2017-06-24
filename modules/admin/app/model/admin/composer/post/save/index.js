var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model'));

class Neon_model_composer_save extends Neon_model_abstract {
  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;

    self.savePost(function(err){
      if(!err) {
        self.successAction();
      } else {
        self.failureAction(err);
      }
    });
  }

  savePost(callback){
    var self = this;
    var hashid = self.request.params.hashid;
    var postBody = self.request.body;
    var category = self.request.body.category;
    self.schemas.post.update(postBody,{where: {hashid: hashid}}).then(function(post){
      if(post){
        if(category){
          self.schemas.category.findOne({where: {id: category}}).then(function(category){
            if(category){
              category.addPost(post);
              callback(false);
            } else {
              callback(true);
            }
          });
        } else {
          self.schemas.post.findById(post[0]).then(function(post){
            post.getCategory().then(function(category){
              if(category){
                category.removePost(post);
              }
            });
          });
          callback(false);
        }
      } else {
        callback(true);
      }
    });
  }
  
  successAction(){
    this.request.flash('notice', 'Post saved successful!');
    this.response.redirect('/admin');
  }

  failureAction(error){
    this.request.flash('error', 'Error saving post!');
    this.response.redirect('/admin');
  }
}

module.exports = Neon_model_composer_save;
