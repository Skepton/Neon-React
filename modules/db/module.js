var path = require('path'),
    async = require('async'),
    Sequelize = require('sequelize'),
    Neon_abstract = require(path.join(appRoot,'abstract/module'));

var sequelize = new Sequelize('postgres', 'pgsql', 'ettfyra14',{
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

class Neon_db extends Neon_abstract {
  constructor(){
    super();
    this.name = "Neon_db";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.schemas = {};
    this.init();
  }

  /*
  ** Module Init
  */
  init(){
    console.log(this.name+' Initiates');
    this.eventSetup();
  }

  /*
  ** Event Setup
  */
  eventSetup(){
    var self = this;
    Neon.canary.on('neon:init_end', function(){
      self.schemaSetup();
    });
  }

  schemaSetup(){
    var self = this;
    sequelize.authenticate().then(function() {
      console.log('Connection has been established successfully.');

      var schemas = Neon.getAllFiles('/schemas/');
      schemas.forEach(function(schema){
        var loadedSchema = schema.init(sequelize);
        self.schemas[schema.name] = loadedSchema;
      });

      async.eachSeries(self.schemas, function(schema, callback){
        /* Initiate any associations in the schema*/
        if ("associate" in schema) {
          schema.associate(self.schemas);
        }
        /* Sync schema with database */
        schema.sync({force: true}).then(function(){
          callback();
        });
      }, function(){
        self.schemas.user.create({username: 'Skepton', password: 'blog', admin: true}).then(function(user){
          console.log(user.get({plain: true}));
        });
      });
    }).catch(function (err) {
      console.log(err);
      //console.log('Unable to connect to the database:', err);
    });
  }


}

module.exports = Neon_db;
