var Sequelize = require('sequelize');

module.exports.name = 'comment';
module.exports.init = function(sequelize){

  var Comment = sequelize.define('comment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hashid: {
      type: Sequelize.STRING,
      unique: true
    },
    parent: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.TEXT
    },
    thread: {
      type: Sequelize.STRING
    }
  });

  Comment.associate = function(models){
    Comment.belongsTo(models.user, {as: 'author'});
    Comment.belongsTo(models.post);
  }

  return Comment;
}
