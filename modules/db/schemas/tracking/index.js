var Sequelize = require('sequelize');

module.exports.name = 'tracking';
module.exports.init = function(sequelize){

  var tracking = sequelize.define('tracking', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    event: {
      type: Sequelize.STRING(65)
    },
    data: {
      type: Sequelize.STRING
    },
    sessionId: {
      type: Sequelize.STRING(48)
    }
  });

  return tracking;
}
