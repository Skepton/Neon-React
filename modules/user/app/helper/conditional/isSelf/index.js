module.exports = function(request){
  if(request.user && request.params && request.params.id == request.user.id){
    return true;
  } else {
    return false;
  }
};
