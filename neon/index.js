var path = require('path'),
    async = require('async'),
    fs = require('fs'),
    ncp = require('ncp'),
    canary = require(path.join(appRoot,'toolkit','canary.js')),
    join = require('path').join;

class Neon {

  constructor(app){
    this.canary = canary;
    this.root = appRoot;
    this.modules = [];
  }

  /*
  ** Starts Neon initiation sequence
  */
  init(app){
    /* Set Node app */
    this.app = app;

    /* Emit function start event */
    this.canary.emit('neon:init_start');

    /* Load / register all modules found in 'modules' folder */
    this.registerModules();

    /* Deploy all static content */
    this.staticContentDeploy();

    /* Setup production / development error handlers, start Express server */
    this.appSetup();

    /* Emit function end event */
    this.canary.emit('neon:init_end');
  }

  /*
  ** Require, but with error catching
  */
  require(requireFile, cache){
    try {
      if(!cache) delete require.cache[require.resolve(requireFile)];
      var requiredFile = require(requireFile);
      return requiredFile;
    } catch(e){
      if(e.code !== "MODULE_NOT_FOUND"){
        console.log(e);
      }
      return false;
    }
  }

  /*
  ** Get folders
  */
  getFolders(foldersPath){
    var setups = {};
    async.eachSeries(this.modules, function(module, callback){
      var completeFoldersPath = path.join(module.getPath(),foldersPath);
      try {
        fs.readdirSync(completeFoldersPath).forEach(function(folder) {
          if(!setups[folder]){
            setups[folder] = [];
          }
          setups[folder].push(path.join(completeFoldersPath,folder));
        });
      } catch(err) {}
      callback();
    });
    return setups;
  }

  /*
  ** Load all modules that have register.js in module root catalog
  */
  registerModules(){
    var self = this,
        modules = path.resolve(__dirname, path.join(appRoot,'./modules/'));

    /* Emit function start event */
    this.canary.emit('neon:register_modules_start');

    /* Read module.js file of installed modules */
    try {
      fs.readdirSync(modules).forEach(function (modulePath) {
        var module = self.require(path.join(modules, modulePath,'module.js'));
        if(module){
          self.addModule(module);
        }
      });
    } catch(err) {}

    /* Emit function end event */
    this.canary.emit('neon:register_modules_end');
  }

  /*
  ** Add module, loaded through require
  */
  addModule(module){
    this.initModule(module);
  }

  /*
  ** Load instance of module
  */
  initModule(module, index){
    if(index){
      this.modules[index] = new module();
    } else {
      this.modules.push(new module());
    }
  }

  /*
  ** Return module instante
  */
  getModule(moduleName){
    var returnModel = false;
    this.modules.forEach(function(module){
      if(module.name === moduleName){
        returnModel = module;
      }
    });
    return returnModel;
  }

  /*
  ** Get all files from active modules matching folder path
  */
  getAllFiles(folderPath){
    var self = this;
    var files = [];
    async.eachSeries(this.modules, function(module, callback){
      var filePath = path.join(module.getPath(),folderPath);
      try {
        fs.readdirSync(filePath).forEach(function(moduleFile) {
          var requiredModuleFile = self.require(path.join(filePath,moduleFile));
          if(requiredModuleFile){
            files.push(requiredModuleFile);
          }
        });
      } catch(err) {}
      callback();
    });
    return files;
  }

  /*
  ** Get first file found matching file path
  */
  getFile(moduleFilePath, cache = true){
    var self = this;
    var file = false;
    async.detectSeries(this.modules, function(module, callback){
      var filePath = path.join(module.getPath(),moduleFilePath);
      var requiredModuleFile = self.require(filePath, cache);
      callback(requiredModuleFile);
    }, function(result){
      file = result;
    });
    return file;
  }

  /*
  ** Get first file found matching file path
  */
  getFilePath(moduleFilePath){
    var self = this;
    var file = false;
    async.detectSeries(this.modules, function(module, callback){
      var filePath = path.join(module.getPath(),moduleFilePath);
      try {
        var stats = fs.lstatSync(filePath);
        if (stats.isFile()) {
          callback(filePath);
        }
      } catch (err) {
        callback();
      }
    }, function(result){
      file = result;
    });
    return file;
  }

  /*
  ** Get first file found matching file path
  */
  getTemplateFile(templateFilePath){
    var self = this;
    var file = false;
    async.detectSeries(this.modules, function(module, callback){
      var filePath = path.join(appRoot,'./pub/static',moduleFilePath);
      try {
        var stats = fs.lstatSync(filePath);
        if (stats.isFile()) {
          callback(filePath);
        }
      } catch (err) {
        callback();
      }
    }, function(result){
      file = result;
    });
    return file;
  }

  appSetup(){
     // production error handler
     this.app.use(function(err, req, res, next) {
     	res.status(err.status || 500);
     	res.render('error', {
     		message: err.message,
     		error: {}
     	});
     });

    // development error handler
    if (this.app.get('env') === 'development') {
    	this.app.use(function(err, req, res, next) {
    		res.status(err.status || 500);
    		res.render('error', {
    			message: err.message,
    			error: err
    		});
    	});
    }
    var server = this.app.listen(config.port, config.ip, function(){
      var addr = server.address();
      console.log('Server listening at '+addr.address+':'+addr.port);
    });
  }

  staticContentDeploy(){
    var self = this;

    /* Make sure pub & pub/static folders exist */
    var pubFolder = path.join(appRoot,'./pub');
    if (!fs.existsSync(pubFolder)){
        fs.mkdirSync(pubFolder);
    }

    var pubStaticFolder = path.join(appRoot,'./pub/static');
    if (!fs.existsSync(pubStaticFolder)){
        fs.mkdirSync(pubStaticFolder);
    }

    var pubViewFolder = path.join(appRoot,'./pub/view');
    if (!fs.existsSync(pubViewFolder)){
        fs.mkdirSync(pubViewFolder);
    }

    /* Find and recreate all registered modules' static content */
    async.eachSeries(self.modules, function(module, callback){
      var moduleStaticFolder = path.join(module.path, 'pub/static');
      if (fs.existsSync(moduleStaticFolder)){
        console.log(module.name + ' has static content!');
        ncp(moduleStaticFolder, pubStaticFolder, function(err){
          if(err){
            console.log('Static deploy: Static content error: '+err);
          }
        });
      }
      callback();
    });

    /* Find and recreate all registered modules' static content */
    async.eachSeries(self.modules, function(module, callback){
      var moduleStaticFolder = path.join(module.path, 'pub/view');
      if (fs.existsSync(moduleStaticFolder)){
        console.log(module.name + ' has view content!');
        ncp(moduleStaticFolder, pubViewFolder, function(err){
          if(err){
            console.log('Static deploy: View content error'+err);
          }
        });
      }
      callback();
    });
  }

}

module.exports = new Neon();
