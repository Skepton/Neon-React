import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/template';
import userStore from 'user/skin/react/helpers/userStore';

class NeonLoginLink extends templateComponent {

  constructor(props){
    super(props);
    this.state = userStore.get();
  }
  componentWillMount(){
    var self = this;
    self.userStoreToken = userStore.getDispatcher.register(function(data){
        self.setState(data);
    });
  }

  componentWillUnmount(){
    userStore.getDispatcher.unregister(this.userStoreToken);
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = NeonLoginLink;
