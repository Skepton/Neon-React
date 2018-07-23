var Sequelize = require('sequelize'),
    path = require('path'),
    restifyModel = require(path.join(appRoot,'neon/toolkit/restifyModel.js')),
    crypto = require('crypto'),
    moment = require('moment');

module.exports.name = 'post';
module.exports.init = function(sequelize){

  var Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hashid: {
      type: Sequelize.STRING,
      unique: true
    },
    headline: {
      type: Sequelize.STRING
    },
    header: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.JSON
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    source: {
      type: Sequelize.STRING(1024)
    },
    tags: {
      type: Sequelize.STRING(1024)
    },
    slug: {
      type: Sequelize.STRING,
      unique: true
    }
  }, {
    getterMethods: {
      postDate: function(postDate){
        return moment(this.createdAt).format("MMM Do YY - h:mm:ss");
      },
      fromDate: function(){
        return moment(this.createdAt).fromNow();
      }
    }
  });

  // Rest API options for model
  options = {
    getEndpoints: ['id','slug','hashid'],
    listDefaults: {
      limit: 10,
      sortby: 'createdAt',
      order: 'desc'
    },
    exclude: [],
    restrictions: {
      LIST: false,
      CREATE: {
        type: 'isAdmin', result: true
      },
      UPDATE: {
        id: {type: 'isAdmin', result: true},
        hashid: {type: 'isAdmin', result: true}
      },
      DELETE: {
        id: {type: 'isAdmin', result: true},
        hashid: {type: 'isAdmin', result: true}
      }
    }
  }

  Post.onRestifyCreate = function(instance, currentUser, postBody){
    return instance.setAuthor(currentUser);
  }

  Post.onRestifyUpdate = function(instance, currentUser, postBody, params){
    return new Promise(function(resolve, reject){
      resolve();
    });
  }

  restifyModel(Post, options, Neon.app);

  // Set model associations
  Post.associate = function(models){
    if(models.user) {
      Post.belongsTo(models.user, {as: 'author', foreignKey: 'authorId'});
    }
    if(models.category){
      Post.belongsTo(models.category, {as: 'category', foreignKey: 'categoryId'});
    }

    Post.afterCreate(function(instance){
      var hash = crypto.createHash('MD5').update(instance.id.toString()).digest('hex');
      instance.hashid = hash;
      Post.update(
        {hashid: hash},{where: {id: instance.id}});
    });

    Post.addHook('beforeFind', function(options){
      options.include = [{model: models.user, as: 'author', attributes: {exclude: ['password']}},{model: models.category, as: 'category'}];
      return options;
    });

  }

  return Post;
}
