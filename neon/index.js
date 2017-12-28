var path = require('path'),
    async = require('async'),
    fs = require('fs'),
    ncp = require('ncp'),
    canary = require(path.join(appRoot,'toolkit','neon','canary.js')),
    join = require('path').join;

var exec = require('child_process').exec;

class Neon {

  constructor(app){
    this.canary = canary;
    this.root = appRoot;
    this.modules = [];
  }

  /*
  ** Starts Neon initiation sequence
  */
  init(app, config){
    /* Set Node app */
    this.app = app;

    /* Set Config */
    this.config = config;

    /* Emit function start event */
    this.canary.emit('neon:init_start');

    /* Load / register all modules found in 'modules' folder */
    this.registerModules();

    /* Make sure pub/static folders exist */
    this.prepareDeploy();

    this.runGulpCompiler();

    /* Preload models for improved performence */
    this.preloadModels();

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
  ** Load theme set in Neon config, fallback to
  */
  registerTheme(){
    var self = this;

    /* Emit function start event */
    this.canary.emit('neon:register_theme_start');

    /* Read module.js file of installed modules */
    try {
      var theme = self.require(path.join(appRoot,'./modules/', config.theme, 'theme.js'));
      if(theme){
        self.addTheme(theme);
      } else {
        var theme = self.require(path.join(appRoot,'./modules/', 'phosphor', 'theme.js'));
        self.addTheme(theme);
      }
    } catch(err) {}

    /* Emit function end event */
    this.canary.emit('neon:register_theme_end');
  }

  /*
  ** Add module, loaded through require
  */
  addModule(module){
    this.initModule(module);
  }

  /*
  ** Add theme, loaded through require
  */
  addTheme(theme){
    this.theme = new theme();
    this.initTheme();
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
  ** Set theme to app, run init function in theme
  */
  initTheme(){
    this.theme.init();
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
  getAllFiles(folderPath, returnPath = false){
    var self = this;
    var files = [];
    async.eachSeries(this.modules, function(module, callback){
      var filePath = path.join(module.getPath(),folderPath);
      try {
        fs.readdirSync(filePath).forEach(function(moduleFile) {
          var requiredModuleFile = self.require(path.join(filePath,moduleFile));
          if(requiredModuleFile){
            if(returnPath) {
              files[moduleFile] = requiredModuleFile;
            } else {
              files.push(requiredModuleFile);
            }
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
      var filePath = path.join(module.getPath(),'./skin/templates',templateFilePath);
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

  readAllFiles(modulePath,folderPath){
    var self = this;
    var files = [];
    var filePath = path.join(modulePath, folderPath);
    try {
      fs.readdirSync(filePath).forEach(function(modelPath) {
        var stats = fs.lstatSync(path.join(filePath,modelPath));
        if (stats.isFile()) {
          var requiredModuleFile = self.require(path.join(filePath,modelPath));
          if(requiredModuleFile){
            files[folderPath] = requiredModuleFile;
          }
        } else {
          var newFiles = self.readAllFiles(modulePath, path.join(folderPath,modelPath));
          for(var key in newFiles) {
              files[key] = newFiles[key];
          }
        }
      });
    } catch(err) {}
    //console.log(files);
    return files;
  }

  getAllModels(folderPath){
    var self = this;
    var files = [];
    async.eachSeries(this.modules, function(module, callback){
      var modelPath = path.join(module.getPath(),folderPath);
      var newFiles = self.readAllFiles(modelPath,'');
      for(var key in newFiles) {
          files[key] = newFiles[key];
      }
      callback();
    });
    return files;
  }

  /*
  ** Preload model from active modules
  */
  preloadModels() {
    var models = this.getAllModels('app/model', true);
    this.models = models;
  }

  /*
  ** Return model from proloaded models
  */
  getModel(model){
    return this.models[model];
  }

  /*
  ** Setup error handling, start server
  */
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

  prepareDeploy(){
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
  }

  runGulpCompiler(){
    exec('npm run gulp scss', function(err, stdout, stderr){
      if (err) {
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`${stdout}`);
      console.log(`${stderr}`);
    });
  }

}

module.exports = new Neon();
