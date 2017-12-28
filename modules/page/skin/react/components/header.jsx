import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/template.jsx';
import logo from '../../images/logo.png';

class NeonHeader extends templateComponent {

  constructor(props){
    super(props);
    this.logoSrc = logo;
  }

}

module.exports = NeonHeader;
