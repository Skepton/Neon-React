import templateComponent from 'page/skin/react/components/template';
import hash from 'object-hash';
import routeStore from 'router/skin/react/helpers/routeStore';

import {getComposerDispatch, setComposerDispatch} from 'admin/skin/react/helpers/composerDispatcher';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';

import AddWidget from 'admin/skin/react/components/composer/addWidget';
import Toolbox from 'admin/skin/react/components/composer/toolbox';

import TextWidget from 'admin/skin/react/components/composer/textWidget';

var widgets = {
  addWidget: AddWidget,
  textWidget: TextWidget
}

class NeonComposer extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      params: routeStore.get().params,
      post: {},
      renderedComposerList: []
    }

    this.addWidgetElement = <widgets.addWidget onClick={this.addTextWidget.bind(this, 0)} />
    this.getPost(this.state);
  }

  /*
  **
  ** Handle Widget Creation, Updating & Rendering
  **
  */
  addTextWidget(position){
    var newWidget = {
      type: "textWidget",
      data: {
        text: ""
      }
    }

    this.addWidget(newWidget, false, position);
  }

  addWidget(widget, first, afterPosition){
    var post = JSON.parse(JSON.stringify(this.state.post));
    var postBody = post.body;

    if(first || postBody.length <= 0){
      postBody.unshift(widget);
    } else {
      postBody.splice(afterPosition, 0, widget);
    }

    post.body = postBody;
    this.setState({post: post});
    this.renderToComposer(postBody);
  }

  removeWidget(position){
    var post = JSON.parse(JSON.stringify(this.state.post));
    var postBody = post.body;

    postBody.splice(position, 1);

    post.body = postBody;
    this.setState({post: post});
    this.renderToComposer(postBody);
  }

  renderToComposer(postBody){
    var self = this;
    var renderedComposerList = [];

    postBody.forEach(function(postBodyWidget, key){
      var PostBodyWidgetType = widgets[postBodyWidget.type];
      var stateHash = hash({data: postBodyWidget.data, key: key});

      renderedComposerList.push(
        <div className="widget-wrapper--inner">
          <PostBodyWidgetType data={postBodyWidget.data} preview="false" sendWidgetUpdates={self.handleWidgetUpdates.bind(self)} index={key} key={stateHash}/>
          <Toolbox onRemove={self.removeWidget.bind(self, key)} index={key} key={key}/>
        </div>
      );
    });

    renderedComposerList.push(<widgets.addWidget onClick={self.addTextWidget.bind(self, postBody.length)}/>);

    this.setState({renderedComposerList: renderedComposerList});
  }

  /*
  **
  ** Handle Widget Updates
  **
  */
  handleWidgetUpdates(key, data){
    var post = JSON.parse(JSON.stringify(this.state.post));
    var postBody = post.body;
    postBody[key].data = data;

    post.body = postBody;
    this.setState({post: post});
  }

  dispatchComposerUpdates(post){
    getComposerDispatch.dispatch({post: post});
  }

  /*
  **
  ** Handle Headline update
  **
  */
  handleInputUpdate(event){
    var targetElement = event.target;
    var targetName = targetElement.getAttribute('name');
    var inputValue = targetElement.value;
    var post = JSON.parse(JSON.stringify(this.state.post));

    post[targetName] = inputValue;

    this.setState({post: post});
  }

  /*
  **
  ** Handle Save, Delete and inital Loading of Post Data
  **
  */
  getPost(){
    var self = this;
    var params = this.state.params;
    if(params.hashid){

      $.ajax({
        url: '/api/post/hashid/'+params.hashid,
        type: 'GET',
        dataType: 'json',
        success: function(post){
          if(!post.body){
            post.body = [];
          }
          self.setState({post: post});
          self.renderToComposer(post.body);
          self.dispatchComposerUpdates(post);
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  }

  setRouteData(data){
    this.setState(data);
    this.getPost();
  }

  savePost(){
    var self = this;
    var params = this.state.params;
    if(params.hashid){
      var post = {
        body: this.state.post.body,
        headline: this.state.post.headline,
        header: this.state.post.header,
        slug: this.state.post.slug,
        source: this.state.post.source,
        tags: this.state.post.tags,
        categoryId: this.state.post.categoryId
      }

      $.ajax({
        url: '/api/post/hashid/'+params.hashid,
        type: 'PUT',
        data: JSON.stringify(post),
        contentType: 'application/json',
        success: function(response){
          console.log('Save Successful!');
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  }

  deletePost(){
    var self = this;
    var params = this.state.params;

    if(params.hashid){
      $.ajax({
        url: '/api/post/hashid/'+params.hashid,
        type: 'DELETE',
        data: this.state.composer,
        dataType: 'json',
        success: function(){
          redirectDispatcher.dispatch('/admin');
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  }

  /*
  **
  ** React Component functions
  **
  */
  componentWillMount(){
    var self = this;
    this.routeDispatcherToken = routeStore.getDispatcher.register(function(data){
      self.setRouteData(data);
    });

    this.setComposerDispatchToken = setComposerDispatch.register(function(data){
      var post = JSON.parse(JSON.stringify(self.state.post));

      post.category = data.category;
      post.categoryId = data.category.id;
      self.setState({post: post});
    });

    // Setup event handlers
    this.savePost = this.savePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillUnmount(){
    routeStore.getDispatcher.unregister(this.routeDispatcherToken);
    setComposerDispatch.unregister(this.setComposerDispatchToken);

    // Remove event handlers
    this.savePost = false;
    this.updateComposer = false;
  }

}

module.exports = NeonComposer;
