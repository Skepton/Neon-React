var Sequelize = require('sequelize'),
    path = require('path'),
    async = require('async'),
    hashPassword = Neon.getFile('app/handlePassword').hashPassword;

function slugify(str) {
  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

  if (str == null) return '';

  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });

  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

module.exports.name = 'user';
module.exports.init = function(sequelize){

  var user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    username: {
      type: Sequelize.STRING(32),
      unique: true
    },
    displayname: {
      type: Sequelize.STRING(32),
      unique: true
    },
    slug: {
      type: Sequelize.STRING(64),
      unique: true
    },
    password: {
      type: Sequelize.STRING(60)
    },
    picture: {
      type: Sequelize.BOOLEAN,
      defaultValue: null
    },
    about: {
      type: Sequelize.STRING,
    }
  }, {
    classMethods: {
      associate: function(models){
        user.hasMany(models.post);
        user.hasMany(models.comment);

        user.beforeCreate(function(instance) {
          return hashPassword(instance.get('password')).then(function(hash){
            instance.set('password', hash);
          });
        });

        user.beforeUpdate(function(instance) {
          if (!instance.changed('password')) return instance;
          return hashPassword(instance.get('password')).then(function(hash){
            instance.set('password', hash);
          });
        });
      }
    },
    setterMethods: {
      username: function(username){
        this.setDataValue('username', username.toLowerCase());
        this.setDataValue('displayname', username);
        this.setDataValue('slug', slugify(username.toLowerCase()));
      }
    }
  });
  return user;
}
