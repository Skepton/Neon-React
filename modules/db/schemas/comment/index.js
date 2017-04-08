var Sequelize = require('sequelize');

module.exports.name = 'comment';
module.exports.init = function(sequelize){

  var comment = sequelize.define('comment', {
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
  }, {
    classMethods: {
      associate: function(models){
        comment.belongsTo(models.user, {as: 'author'});
        comment.belongsTo(models.post);
      }
    }
  });

  return comment;
}
