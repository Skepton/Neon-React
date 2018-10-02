import reactLayout from 'reactLayout.js';
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
      pageHash: false
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
    var hashPath = hash(this.state.path);
    var hashPage = hash(hashLayout + hashPath);

    this.setState({parsedLayout: parsedLayout, 'pageHash': hashPage});
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

  componentWillReceiveProps(data){
    routeStore.setDispatcher.dispatch({path: data.route, params: data.routeProps.match.params});
  }

  render() {
    var state = this.state;
    return <state.parsedLayout.class layout={state.parsedLayout.block} template={state.parsedLayout.template} children={state.parsedLayout.children} key={state.pageHash}/>;
  }
}

module.exports = reactRouter;
