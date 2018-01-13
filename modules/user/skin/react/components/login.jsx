import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/template';
import Zepto from 'zepto';
import userStore from 'user/skin/react/helpers/userStore';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';
import { BrowserRouter } from 'react-router-dom';

class NeonLogin extends templateComponent {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      username: "",
      password: ""
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
    var self = this;
    event.preventDefault();
    $.ajax({
      url: '/login',
      type: 'POST',
      data: self.state,
      dataType: 'json',
      success: function(data){
        userStore.setDispatcher.dispatch({loggedIn: true, user: data});
        redirectDispatcher.dispatch('/');
      },
      error: function(err){
        console.log(err);
      }
    });
  }

}

module.exports = NeonLogin;
