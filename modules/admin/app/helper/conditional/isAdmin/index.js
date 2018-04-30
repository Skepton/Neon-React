module.exports = function(request){
  if(request.user && request.user.dataValues.admin === true){
    return true;
  } else {
    return false;
  }
};
