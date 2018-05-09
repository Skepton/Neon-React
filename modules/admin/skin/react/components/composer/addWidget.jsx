import templateComponent from 'page/skin/react/components/template';
import template from 'admin/skin/react/templates/composer/addWidget';

class addWidget extends templateComponent {

  constructor(props){
    super(props);
    this.template = template;
  }

}

module.exports = addWidget;
