import routeStore from 'router/skin/react/helpers/routeStore';
import templateComponent from 'page/skin/react/components/list';

class NeonLinkList extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      'active': false
    }
  }

  setActiveItem() {
    if(typeof this.layout.data != 'undefined' && routeStore.get().path == this.layout.data.link){
      this.setState({'active': true});
    }
  }

  componentWillMount(){
    this.setActiveItem();
  }

}

module.exports = NeonLinkList;
