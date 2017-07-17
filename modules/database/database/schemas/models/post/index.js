var Sequelize = require('sequelize'),
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
      type: Sequelize.TEXT
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
      postDate: function(){
        return moment(this.updatedAt).format();
      },
      fromDate: function(){
        return moment(this.updatedAt).fromNow();
      }
    }
  });

  Post.associate = function(models){
    Post.belongsTo(models.user, {as: 'author', foreignKey: 'userId'});
    Post.belongsTo(models.category, {as: 'category'});

    Post.addHook('beforeFind', function(options){
      options.include = [{model: models.user, as: 'author', attributes: {exclude: ['password','updatedAt']}},{model: models.category, as: 'category'}];
      return options;
    });
  }

  return Post;
}
