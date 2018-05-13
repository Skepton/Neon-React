var Sequelize = require('sequelize'),
    path = require('path'),
    slugify = require(path.join(appRoot,'modules/category/app/helper/slugify.js')),
    restifyModel = require(path.join(appRoot,'toolkit/neon/restifyModel.js'));

module.exports.name = 'category';
module.exports.init = function(sequelize){

  var Category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sorting: {
      type: Sequelize.INTEGER,
      defaultValue: -1
    },
    title: {
      type: Sequelize.STRING(64),
      unique: false
    },
    slug: {
      type: Sequelize.STRING(64)
    },
    isRoot: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  },
  {
    indexes: [
      { unique: true, fields: [ 'slug', 'parentId'], where: {parentId: {$ne: null}} },
      { unique: true, fields: [ 'slug', 'isRoot'], where: {parentId: {$eq: null}} }
    ],
    setterMethods: {
      title: function(title){
        this.setDataValue('slug', slugify(title));
        this.setDataValue('title', title);
        return title;
      }
    }
  });

  // Rest API options for model
  options = {
    getEndpoints: ['id','slug','hashid'],
    listDefaults: {
      limit: 10,
      sortby: 'sorting',
      order: 'ASC'
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

  Category.onRestifyCreateAssociation = function(instance, currentUser, params){
    var NeonDatabase = Neon.getModule('Neon_database');

    return new Promise(function(resolve, reject){
      if(typeof params.associations != 'undefined' && typeof params.associations.parentId != 'undefined'){
        NeonDatabase.schemas.category.findById(params.associations.parentId).then((category) => {
          instance.setParent(category).then(function(){
            resolve();
          });
        }).error(function(err){
          reject();
          console.log(err);
        });
      } else {
        resolve();
      }
    });
  }

  restifyModel(Category, options, Neon.app);

  Category.associate = function(models){
    Category.belongsTo(models.category, {as: 'parent', foreignKey: {name: 'parentId'}});
  }

  return Category;
}
