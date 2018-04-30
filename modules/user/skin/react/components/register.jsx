import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/template';
import Zepto from 'zepto';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';
import { BrowserRouter } from 'react-router-dom';

class NeonRegister extends templateComponent {

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
      url: '/api/user',
      type: 'POST',
      data: self.state,
      dataType: 'json',
      success: function(data){
        redirectDispatcher.dispatch('/login');
      },
      error: function(err){
        console.log(err);
      }
    });
  }

}

module.exports = NeonRegister;
