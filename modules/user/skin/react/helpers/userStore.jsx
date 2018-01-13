import {getUserDispatch, setUserDispatch} from 'user/skin/react/helpers/loginDispatcher';

class UserStore {

  constructor(){
    this.data = {
      loggedIn: false,
      user: false
    }
    this.setDispatcher = setUserDispatch;
    this.getDispatcher = getUserDispatch;
    this.setupDispatchRegister();
    this.checkLoggedIn();
  }

  checkLoggedIn(){
    var self = this;
    $.ajax({
      url: '/isLoggedIn',
      type: 'POST',
      dataType: 'json',
      success: function(data){
        self.setDispatcher.dispatch({loggedIn: true, user: data});
      },
      error: function(err){
        self.setDispatcher.dispatch({loggedIn: false, user: false});
      }
    });
  }

  get(){
    return this.data;
  }

  pushUserUpdate(){
    var self = this;
    this.getDispatcher.dispatch(self.data);
  }

  setupDispatchRegister(){
    var self = this;

    // Register dispatcher to catch and update UserStore with new 'pushed' data
    self.setDispatcher.register(function(data){
        self.data = {...self.data, ...data};

        // Dispatch new user data to
        self.pushUserUpdate();
    });


  }

}

module.exports = new UserStore;
