import {getRouteDispatch, setRouteDispatch} from 'router/skin/react/helpers/routeDispatcher';

class RouteStore {

  constructor(){
    this.data = {
      path: '/',
      params: []
    }
    this.setDispatcher = setRouteDispatch;
    this.getDispatcher = getRouteDispatch;
    this.setupDispatchRegister();
  }

  get(){
    return this.data;
  }

  pushRouteUpdate(){
    var self = this;
    this.getDispatcher.dispatch(self.data);
  }

  setupDispatchRegister(){
    var self = this;

    // Register dispatcher to catch and update UserStore with new 'pushed' data
    self.setDispatcher.register(function(data){
        self.data = {...self.data, ...data};

        // Dispatch new user data to
        self.pushRouteUpdate();
    });


  }

}

module.exports = new RouteStore;
