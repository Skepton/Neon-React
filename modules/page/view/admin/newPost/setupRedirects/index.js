var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract'),
    crypto = require('crypto');

class newPost extends abstract {

  constructor(db, request){
    super(db, request);
    this.modelData =   {
      headline: '',
      header: '',
      body: ''
    }
  }

  createEmptyPost(callback){
    var self = this;
    self.models.post.create(this.modelData).then(function(post){
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

  successAction(request, response){
    response.redirect('/admin/composer/'+this.hash);
  }

  failureAction(request, response, errors){
    console.log(errors);
    request.flash('error', 'New post could not be created!');
    response.redirect('/admin');
  }

}

module.exports = function(request, callback){
  var newPostInstance = new newPost(db, request);
  newPostInstance.createEmptyPost(function(post, err){
    callback(newPostInstance, err);
  });
}
