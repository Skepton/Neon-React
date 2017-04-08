var getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon');

module.exports = function(){
  var request = context.get('request');
  console.log(request);
  if(request.user){
    return true;
  } else {
    return false;
  }
};
