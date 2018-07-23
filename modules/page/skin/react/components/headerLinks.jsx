class templateComponent extends React.Component {

  constructor(props){
    super(props);
    this.layout = props.layout;
    this.setTemplate(props.template);
  }

  setTemplate(template){
    this.template = template;
  }

  render() {
    return this.template(this);
  }

}

module.exports = templateComponent;
