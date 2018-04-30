module.exports = function(request){
  if(request.user){
    return true;
  } else {
    return false;
  }
};
