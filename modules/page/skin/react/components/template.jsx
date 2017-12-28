import React from 'react';
import ReactDOM from 'react-dom';

class templateComponent extends React.Component {

  constructor(props){
    super();
    this.block = props.block;
    this.setTemplate(props.template);
    this.prepareChildren(props.children);
  }

  setTemplate(template){
    this.template = template;
  }

  prepareChildren(children){
    var self = this;
    self.children = [];
    if(children && children.length > 0){
      children.forEach(function(child){
        self.children[child.block.name] = <child.class block={child.block} template={child.template} children={child.children} />
      });
    }
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = templateComponent;
