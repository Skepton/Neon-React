var path = require('path'),
    config = require(path.join(appRoot,'config')),
    nunjucks = require('nunjucks');

var env = new nunjucks.configure('', {
    autoescape: false,
    noCache: true,
    express: Neon.app
});

function urlhelperExtension() {
  this.tags = ['urlhelper'];

  this.parse = function(parser, nodes, lexer) {
      // get the tag token
      var tok = parser.nextToken();

      // parse the args and move after the block end. passing true
      // as the second arg is required if there are no parentheses
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);

      // parse the body and possibly the error block, which is optional
      var body = parser.parseUntilBlocks('endurlhelper');

      parser.advanceAfterBlockEnd();

      // See above for notes about CallExtension
      return new nodes.CallExtension(this, 'run', args, [body]);
  }

  this.run = function(context, url, body) {
    if(url.indexOf('{{theme}}') >= 0) {
      //url = url.replace('{{theme}}', path.join('theme',config.theme));
    } else if(url.indexOf('{{skin}}') >= 0) {
      //url = url.replace('{{skin}}', path.join('theme',config.theme,'frontend','skin'));
    } else if(url.indexOf('{{baseUrl}}') >= 0) {
      //url = url.replace('{{baseUrl}}', path.join('//',config.baseUrl));
    }
    return url;
  }
}

env.addExtension('urlhelperExtension', new urlhelperExtension());

module.exports = env;
