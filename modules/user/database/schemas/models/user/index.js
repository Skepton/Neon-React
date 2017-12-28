var Sequelize = require('sequelize'),
    path = require('path'),
    async = require('async'),
    restifyModel = require(path.join(appRoot,'toolkit/neon/restifyModel.js')),
    hashPassword = Neon.getFile('app/helper/handlePassword').hashPassword;

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

  var User = sequelize.define('user', {
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
    setterMethods: {
      username: function(username){
        this.setDataValue('username', username.toLowerCase());
        this.setDataValue('displayname', username);
        this.setDataValue('slug', slugify(username.toLowerCase()));
      }
    }
  });

  // Setup rest API for model
  options = {
    endpoints: ['id'],
    listDefaults: {
      limit: 10,
      sortby: 'createdAt',
      order: 'desc'
    },
    exclude: ['password','createdAt','updatedAt']
  }
  restifyModel(User, options, Neon.app);

  // Set model associations
  User.associate = function(models){
    User.hasMany(models.post, {as: 'author'});
    User.hasMany(models.comment);

    User.beforeCreate(function(instance) {
      return hashPassword(instance.get('password')).then(function(hash){
        instance.set('password', hash);
      });
    });

    User.beforeUpdate(function(instance) {
      if (!instance.changed('password')) return instance;
      return hashPassword(instance.get('password')).then(function(hash){
        instance.set('password', hash);
      });
    });
  }

  return User;
}
