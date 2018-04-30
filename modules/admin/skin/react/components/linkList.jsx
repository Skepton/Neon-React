import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/list';

class NeonLinkList extends templateComponent {

  constructor(props){
    super(props);
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = NeonLinkList;
