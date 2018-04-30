import React from 'react';
import ReactDOM from 'react-dom';
import template from 'admin/skin/react/templates/composer/toolbox.rt';

class toolBox extends React.Component {

  constructor(props){
    super(props);
    this.template = template;
  }

  setTemplate(template){
    this.template = template;
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = toolBox;
