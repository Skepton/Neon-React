var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class postCenterList extends abstract {
  constructor(db){
    super(db);
  }
  getPostList(request, callback){
    var self = this;
    self.models.post.findAll({ limit: 10, order: '"createdAt" DESC'}).then(function(posts){
      callback(posts);
    });
  }
}

module.exports = function(request, response, callback){
  var postCenterListInstance = new postCenterList(db);
  postCenterListInstance.getPostList(request, function(data){
    callback(data);
  });
}
