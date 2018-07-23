import templateComponent from 'page/skin/react/components/template';

class NeonHeader extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      isLinksMenuOpen: false
    }
  }

  openLinksMenu(){
    this.setState({linksMenuOpen: true});
  }

  closeLinksMenu(){
    this.setState({linksMenuOpen: false});
  }

}

module.exports = NeonHeader;
