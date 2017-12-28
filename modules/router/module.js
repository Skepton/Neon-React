var path = require('path'),
    nunjucks = require(path.join(appRoot,'toolkit','neon','nunjucksExtended.js')),
    getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon'),
    async = require('async');

var Neon_abstract = require(path.join(appRoot,'abstract/module'));

class Neon_router extends Neon_abstract {
  constructor(){
    super();
    this.name = "Neon_router";
    this.version = "0.0.1";
    this.setPath(path.resolve(__dirname));
    this.init();
  }

  /*
  ** Module Init
  */
  init(){
    this.eventSetup();
  }

  /*
  ** Event Setup
  */
  eventSetup(){
    var self = this;
    Neon.canary.on('neon:init_end', function(){
      self.routerSetup('', false);
    });
  }

  /*
  ** Router Setup
  */
  routerSetup(){
    var self = this;
    var layoutSetups = Neon.getFolders('app/layout/setup/');

    async.forEachOf(layoutSetups, function(routePaths, method, callbackLayouts){
      async.eachSeries(routePaths, function(routePath, callbackRoutePaths){
        var routes = Neon.require(routePath);
        async.eachSeries(routes, function(route, callbackRoutes){
          var type = method;
          var fullPath = route.path;

          // Used for carrying conditional checked from parent to child routes
          var conditional = route.conditional || false;

          switch (type) {
            case 'get':

              var preparedLayout = self.prepareLayout(route);
              Neon.app.get(fullPath, function(req,res){
                console.time('request');

                /*
                ** Request context created, setting request and response object
                ** in context for fetching anywhere within this context
                */
                context.run(function(){
                  context.set('request', req);
                  context.set('response', res);
                  context.set('route', fullPath);

                  if(!conditional || (conditional && self.conditional(conditional))){
                    var rootBlock = self.getRootBlock(preparedLayout);
                    if(rootBlock){
                      console.log(preparedLayout);
                      nunjucks.render(Neon.getTemplateFile(rootBlock.rootTemplate),{layout: JSON.stringify(preparedLayout)},function(err, html){
                        if(!err){
                          res.send(html);
                        } else {
                          res.redirect('/');
                        }
                      });
                    } else {
                      res.redirect('/');
                    }
                  } else {
                    res.redirect('/');
                  }
                });

              });
              break;

            case 'post':
              Neon.app.post(fullPath, function(req,res){
                context.run(function(){

                  /*
                  ** Request context created, setting request and response object
                  ** in context for fetching anywhere within this context
                  */
                  context.set('request', req);
                  context.set('response', res);

                  if(!conditional || (conditional && self.conditional(conditional))){
                    self.handlePost(route);
                  } else {
                    res.redirect('/');
                  }
                });

              });
              break;
          }
          callbackRoutes();
        });
        callbackRoutePaths();
      });
      callbackLayouts();
    });

  }

  handlePost(route){
    var modelClass = Neon.getFile('app/model/'+route.model);
    var modelInstance = new modelClass();
  }

  prepareLayout(route){
    var self = this;
    var layoutHandle = route.handle;
    var layoutUpdates;
    var layout = Neon.getFile('app/layout/handles/'+layoutHandle, false);

    if(route.handleUpdates){
      layoutUpdates = route.handleUpdates;
      layoutUpdates.unshift(layoutHandle);
    } else {
      layoutUpdates = Array(layoutHandle);
    }

    var layoutUpdateFiles = [];
    layoutUpdates.forEach(function(handleUpdates){
      var updateFiles = Neon.getAllFiles('app/layout/updates/'+handleUpdates);
      if(updateFiles.length > 0){
        updateFiles.forEach(function(updateFile){
          layoutUpdateFiles.push(updateFile);
        });
      }
    });

    if(layoutUpdateFiles.length > 0){
      layoutUpdateFiles.forEach(function(layoutUpdate){
        layout = self.jsonMerge(layout, layoutUpdate);
      });
    }
    return layout;
  }

  // Returns all modification references in modification layout
  getReferences(modifications){
    var references = [];
    for(var key in modifications){
      references.push(modifications[key]);
    }
    return references;
  }

  //Returns keys & values used for mathing for a reference
  getMatches(reference){
    var matches = [];
    for (var key in reference){
      if(key.indexOf('@') < 0){
        var match = {};
        match[key] = reference[key];
        matches.push(match);
      }
    }
    return matches;
  }

  //Returns all actions for a reference
  getActions(reference){
    return reference['@actions'];
  }

  matchBlock(block, matches){
    var matching = true;
    matches.forEach(function(match){
      for(var key in match){
        if(block[key] !== match[key]){
          matching = false;
        }
      }
    });
    return matching;
  }

  performAction(block, actions){
    actions.forEach(function(action){
      for(var key in action){
        var actionObject = action[key];
        switch (key) {
          //Modify Action
          case "@modify":
            block[actionObject.key] = actionObject.value;
            break;
          case "@addChildBlock" ||  "@addChildBlockAfter":
            block["children"].push(actionObject);
            break;
          case "@addChildBlockBefore":
            block["children"].unshift(actionObject);
            break;
          case "@removeChildBlock":
            block['children'] = block["childres"].filter(function(childBlock){
              var keep = true;
              for(var key in actionObject){
                if(childBlock[key] === actionObject[key]){
                  keep = false;
                }
              }
              return keep;
            });
            break;
        }
      }
    });
  }

  iterateBlocks(parentBlock, modifications){
    var self = this;
    var isMatch = self.matchBlock(parentBlock, modifications.matches);
    if(isMatch){
      self.performAction(parentBlock, modifications.actions);
    }
    parentBlock.children.forEach(function(block){
      self.iterateBlocks(block, modifications);
    });
  }

  performActionsOnMatches(base, modifications){
    var self = this;
    self.iterateBlocks(base, modifications);
  }

  jsonMerge(base, modification){
    var self = this;
    var references = self.getReferences(modification);
    references.forEach(function(reference){
      var modifications = {
        "matches": [],
        "actions": []
      }
      modifications.matches = self.getMatches(reference);
      modifications.actions = self.getActions(reference);
      self.performActionsOnMatches(base, modifications);
    });
    return base;
  }

  getRootBlock(preparedLayout){
    if(preparedLayout.name === 'root'){
      return preparedLayout;
    } else {
      return false;
    }
  }

  conditional(conditionalType){
    var conditionalFunction = Neon.getFile(path.join('app/helper/conditional',conditionalType), false);
    if(conditionalFunction){
      return conditionalFunction();
    } else {
      return false;
    }
  }

}

module.exports = Neon_router;
