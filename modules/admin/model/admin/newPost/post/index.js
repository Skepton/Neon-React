var path = require('path'),
    Neon_model_abstract = require(path.join(appRoot,'abstract/model')),
    crypto = require('crypto');

class Neon_model_new_post extends Neon_model_abstract {

  constructor(){
    super();
    this.init();
  }

  init(){
    var self = this;

    self.modelData =   {
      headline: '',
      header: '',
      body: ''
    }
    self.createEmptyPost(function(post, err){
      if(post && !err) {
        self.successAction();
      } else {
        self.failureAction(err);
      }
    });
  }

  createEmptyPost(callback){
    var self = this;

    self.schemas.post.create(self.modelData).then(function(post){
      if(post){
        var hash = crypto.createHash('MD5').update(post.id.toString()).digest('hex');
        self.hash = hash;
        self.request.user.addPost(post);
        post.setAuthor(self.request.user);
        post.update({ slug: hash, hashid: hash }).then(function(post){
          if(post){
            callback(post, undefined);
          }
        }).catch(function(err){
          callback(undefined, err);
        });
      }
    }).catch(function(err){
      callback(undefined, err);
    });
  }

  successAction(){
    var self = this;

    self.response.redirect('/admin/composer/'+this.hash);
  }

  failureAction(err){
    var self = this;

    self.request.flash('error', 'New post could not be created!');
    self.response.redirect('/admin');
  }

}

module.exports = Neon_model_new_post;
