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

module.exports = function(model, options, app){
  var apiPrefix = Neon.config.apiEndpoint;
  var exclude = options.exclude;

  /*
  ** Setup all GET requests
  */
  var endpoints = options.endpoints;
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
      res.status(404).send('Invalid URL');
    });
  });

  /*
  ** Setup CREATE new entry
  */
  app.post(path.join(Neon.config.apiEndpoint, model.name), function(req, res){
    var params = req.body;
    var data = {
      "admin": false,
      "username": params.username,
      "password": params.password,
      "about": ""
    }
    model.create(data).then(function(user){
      res.send('Entry successfully created');
    }).catch(function(err){
      res.status(404).send('Could not create new entry');
    });
  });

  /*
  ** Setup UPDATE for existing entries
  */
  var endpoints = options.endpoints;
  endpoints.forEach(function(endpoint){
    app.put(path.join(Neon.config.apiEndpoint, model.name, endpoint, ':'+endpoint), function(req, res){
      var params = req.params;
      var where = {};
      where[endpoint] = params[endpoint];
      var body = req.body;
      model.findOne({where: where, attributes: {exclude: exclude}}).then(function(entry){
        if(entry){
          entry.update(body).then(function(){
            res.send('Entry successfully updated');
          }).catch(function(err){
            res.status(404).send('Could not update entry');
          });
        } else {
          res.status(404).send('Entry does not exist');
        }
      });
    });
  });

}
