import React from 'react';
import ReactDOM from 'react-dom';
import template from 'admin/skin/react/templates/composer/addWidget.rt';

class addWidget extends React.Component {

  constructor(props){
    super(props);
    this.template = template;
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = addWidget;
