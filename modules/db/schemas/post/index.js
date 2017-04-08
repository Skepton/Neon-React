var Sequelize = require('sequelize'),
    moment = require('moment');

module.exports.name = 'post';
module.exports.init = function(sequelize){

  var post = sequelize.define('post', {
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
    classMethods: {
      associate: function(models){

        post.belongsTo(models.user, {as: 'author', foreignKey: 'userId'});
        post.belongsTo(models.category, {as: 'category'});

        post.addHook('beforeFind', function(options){
          options.include = [{model: models.user, as: 'author', attributes: {exclude: ['password','updatedAt']}},{model: models.category, as: 'category'}];
          return options;
        });

      }
    },
    getterMethods: {
      postDate: function(){
        return moment(this.updatedAt).format();
      },
      fromDate: function(){
        return moment(this.updatedAt).fromNow();
      }
    }
  });

  return post;
}
