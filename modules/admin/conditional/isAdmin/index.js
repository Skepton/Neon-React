var getNamespace = require('continuation-local-storage').getNamespace,
    context = getNamespace('com.neon');

module.exports = function(){
  var request = context.get('request');
  console.log(request.user.dataValues.admin === true);
  if(request.user && request.user.dataValues.admin === true){
    return true;
  } else {
    return false;
  }
};
