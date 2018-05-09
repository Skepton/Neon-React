import templateComponent from 'page/skin/react/components/template';
import template from 'admin/skin/react/templates/composer/toolbox';

class toolBox extends templateComponent {

  constructor(props){
    super(props);
    this.template = template;
  }

  setTemplate(template){
    this.template = template;
  }

}

module.exports = toolBox;
