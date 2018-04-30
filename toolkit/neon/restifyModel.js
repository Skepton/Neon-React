var path = require('path'),
    pathToRegexp = require('path-to-regexp');

function parseListParams(params){
  if(typeof(params) !== 'undefined'){
    var regexParse = /([a-zA-Z0-9-]+!*\/[a-zA-Z0-9-]+)/g;
    var matches = params.match(regexParse);
    var parsedMatches = {};
    if(matches && matches.length > 0){
      matches.forEach(function(match){
        var key = match.split('/')[0];
        var value = match.split('/')[1].replace('/','');
        parsedMatches[key] = value;
      });
      return parsedMatches;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function handleRequestRestriction(request, restriction){
  var conditionalType = restriction.type;
  var conditionalRequiredResult = restriction.result;

  return restrictionPromise = new Promise(function(resolve, reject){
    var conditionalFunction = Neon.getFile(path.join('app/helper/conditional',conditionalType), false);

    if(conditionalFunction){
      var conditionalResult = conditionalFunction(request);

      if(conditionalResult === conditionalRequiredResult){
        resolve();
      } else {
        reject('Conditional mismatch');
      }

    } else {
      reject('No conditional with name: ' + conditionalType);
    }

  });
}

module.exports = function(model, options, app){
  var apiPrefix = Neon.config.apiEndpoint;
  var exclude = options.exclude;
  var restrictions = options.restrictions;

  /*
  ** Setup all GET requests
  */
  var endpoints = options.getEndpoints;
  endpoints.forEach(function(endpoint){

    // List entries based on attribute endpoints
    app.get(path.join(Neon.config.apiEndpoint, model.name, endpoint, ':'+endpoint), function(req, res){
      var params = req.params;
      var where = {};
      where[endpoint] = params[endpoint];
      model.findOne({where: where, attributes: {exclude: exclude}}).then(function(data){
        res.json(data);
      });
    });

  });

  // List all entries
  app.get(path.join(Neon.config.apiEndpoint, model.name, '/*?'), function(req, res){
    var params = parseListParams(req.params[0]);
    listOptions = {
      attributes: {
        exclude: exclude
      },
      limit: params && params.limit ? params.limit : options.listDefaults.limit,
      order: [[params && params.sortby && typeof(model.rawAttributes[params.sortby]) !== 'undefined' ? params.sortby : options.listDefaults.sortby, params && params.order ? params.order : options.listDefaults.order]]
    }
    model.findAll(listOptions).then(function(data){
      res.json(data);
    }).catch(function(err){
      res.status(404).send({type: 'error', message: 'Invalid URL'});
    });
  });

  /*
  ** Setup CREATE new entry
  */
  app.post(path.join(Neon.config.apiEndpoint, model.name), function(req, res){
    handleRequestRestriction(req, restrictions['CREATE']).then(function(){
      var params = req.body;
      model.create(params).then(function(data){
        if(typeof model.onRestifyCreateAssociation === 'function'){
          model.onRestifyCreateAssociation(data, req.user).then(function(data){
            res.send({type: 'success', message: 'Entry successfully created', data: data});
          });
        } else {
          res.send({type: 'success', message: 'Entry successfully created', data: data});
        }
      }).catch(function(err){
        console.log(err);
        res.status(404).send({type: 'error', message: 'Could not create new entry'});
      });
    }).catch(function(err){
      console.log(err);
      res.status(401).send({type: 'error', message: 'Unauthorized request'});
    });
  });

  /*
  ** Setup DELETE new entry
  */
  var endpoints = options.getEndpoints;
  endpoints.forEach(function(endpoint){
    app.delete(path.join(Neon.config.apiEndpoint, model.name, endpoint, ':'+endpoint), function(req, res){
      handleRequestRestriction(req, restrictions['DELETE'][endpoint]).then(function(){
        var params = req.params;
        var where = {};
        where[endpoint] = params[endpoint];

        model.findOne({where: where}).then(function(entry){
          if(entry){
            entry.destroy().then(function(){
              res.send({type: 'success', message: 'Entry successfully deleted', data: {}});
            });
          } else {
            res.status(404).send({type: 'error', message: 'No entry found'});
          }
        }).catch(function(err){
          console.log(err);
          res.status(404).send({type: 'error', message: 'Could not delete entry'});
        });

      }).catch(function(err){
        console.log(err);
        res.status(401).send({type: 'error', message: 'Unauthorized request'});
      });

    });
  });

  /*
  ** Setup PUT (UPDATE) for existing entries
  */
  var endpoints = options.getEndpoints;
  endpoints.forEach(function(endpoint){
    app.put(path.join(Neon.config.apiEndpoint, model.name, endpoint, ':'+endpoint), function(req, res){
      handleRequestRestriction(req, restrictions['UPDATE'][endpoint]).then(function(){
        var params = req.params;
        var where = {};
        where[endpoint] = params[endpoint];
        var body = req.body;
        model.findOne({where: where, attributes: {exclude: exclude}}).then(function(entry){
          if(entry){
            entry.update(body).then(function(data){
              res.send({type: 'success', message: 'Entry successfully updated', data: data});
            }).catch(function(err){
              console.log(err);
              res.status(404).send({type: 'error', message: 'Could not update entry'});
            });
          } else {
            res.status(404).send({type: 'error', message: 'Entry does not exist'});
          }
        });
      }).catch(function(err){
        console.log(err);
        res.status(401).send({type: 'error', message: 'Unauthorized request'});
      });
    });
  });

}
