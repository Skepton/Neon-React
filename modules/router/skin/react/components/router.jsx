import reactLayout from 'reactLayout';
import hash from 'object-hash';
import Zepto from 'zepto';
import routeStore from 'router/skin/react/helpers/routeStore';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';

class reactRouter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: props.route,
      params: props.routeProps.match.params,
      generalLayout: layout,
      layout: false,
      layoutHash: false
    }
  }

  setupDispatchers(){
    var self = this;
    self.redirectDispatcherToken = redirectDispatcher.register(function(data){
        self.props.routeProps.history.push(data);
    });
    routeStore.setDispatcher.dispatch({path: this.state.path, params: this.state.params});
  }

  digestLayout(layoutObject) {
    var parsedLayout = reactLayout.parse(layoutObject);
    var hashLayout = hash(layoutObject);

    this.setState({parsedLayout: parsedLayout, 'layoutHash': hashLayout});
    localStorage.setItem('layout', JSON.stringify(layoutObject));
  }

  getInitalLayout(){
    var storedInPath = this.state.generalLayout[this.state.path];
    if(storedInPath){
      return storedInPath;
    } else {
      return false;
    }
  }

  storeLayout(unparsedLayout, path){
    this.state.generalLayout[path] = unparsedLayout;
  }

  componentWillMount(){
    var self = this;
    var storedLayout = self.getInitalLayout();
    if(storedLayout){
      self.digestLayout(storedLayout);
    } else {
      if(localStorage.getItem('layout')){
        self.digestLayout(JSON.parse(localStorage.getItem('layout')));
      }
    }

    // Setup dispatchers
    this.setupDispatchers();
  }

  componentDidMount(){
    var self = this;

    if(!self.getInitalLayout()){
      $.ajax({
        url: self.state.path,
        type: 'GET',
        data: {ajax: true},
        dataType: 'json',
        success: function(data){
          self.digestLayout(data);
          self.storeLayout(data, self.state.path);
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  }

  componentWillUnmount(){
    redirectDispatcher.unregister(this.redirectDispatcherToken);
  }

  render() {
    return <this.state.parsedLayout.class layout={this.state.parsedLayout.block} template={this.state.parsedLayout.template} children={this.state.parsedLayout.children} key={this.state.layoutHash}/>;
  }
}

module.exports = reactRouter;
