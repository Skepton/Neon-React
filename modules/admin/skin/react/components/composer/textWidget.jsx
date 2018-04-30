import React from 'react';
import ReactDOM from 'react-dom';
import editorTemplate from 'admin/skin/react/templates/composer/textWidget-editor.rt';

class textWidget extends React.Component {

  constructor(props){
    super(props);
    this.editorTemplate = editorTemplate;
    this.state = {
      preview: props.preview,
      placeholder: "Ut enim ad minim veniam, quis nostrud exercitation",
      data: {
        text: props.data.text
      }
    }
  }

  setTemplate(template){
    this.template = template;
  }

  onUpdate(e){
    var state = this.state;
    state.data.text = e.target.value;
    this.setState(state);
    this.props.sendWidgetUpdates(this.props.index, state.data);
  }

  render() {
    return this.editorTemplate.call(this);
  }

}

module.exports = textWidget;
