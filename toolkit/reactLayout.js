import React from 'react';
import ReactDOM from 'react-dom';

module.exports = {
  parse: function(layout){
    var self = this;
    return self.renderComponent(layout);
  },
  renderComponent: function(block){
    var self = this;
    var children = block.children;
    var parentComponent = require('../modules/'+block.component+'.jsx');
    var parentTemplate = require('../modules/'+block.reactTemplate+ '.rt').default;
    var childrenComponents = [];
    if(children && children.length > 0){
      children.forEach(function(child){
        childrenComponents.push(self.renderComponent(child));
      });
    }

    return {
      class: parentComponent,
      template: parentTemplate,
      children: childrenComponents,
      layout: block
    }
  }
}
