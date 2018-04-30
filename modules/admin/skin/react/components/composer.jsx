import React from 'react';
import ReactDOM from 'react-dom';
import templateComponent from 'page/skin/react/components/template';
import Zepto from 'zepto';
import hash from 'object-hash';
import routeStore from 'router/skin/react/helpers/routeStore';
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

    console.log(postBody.splice(position, 1));

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
        <div class="widget-wrapper--inner">
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

  /*
  **
  ** Handle Headline update
  **
  */

  handleHeadlineUpdate(e){
    var inputValue = e.target;
    var post = JSON.parse(JSON.stringify(this.state.post));
    console.log(inputValue);

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
        success: function(response){
          var post = response;
          post.body = JSON.parse(post.body) || [];
          self.setState({post: post});
          self.renderToComposer(post.body);
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
        body: JSON.stringify(this.state.post.body)
      }

      $.ajax({
        url: '/api/post/hashid/'+params.hashid,
        type: 'PUT',
        data: post,
        dataType: 'json',
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
          console.log('Delete Successful!');
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

    // Setup event handlers
    this.savePost = this.savePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillUnmount(){
    routeStore.getDispatcher.unregister(this.routeDispatcherToken);

    // Remove event handlers
    this.savePost = false;
    this.updateComposer = false;
  }

  render() {
    return this.template.call(this);
  }

}

module.exports = NeonComposer;