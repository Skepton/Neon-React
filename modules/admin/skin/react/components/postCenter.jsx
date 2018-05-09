import templateComponent from 'page/skin/react/components/template';
import Zepto from 'zepto';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';
import { BrowserRouter } from 'react-router-dom';

class NeonPostCenter extends templateComponent {

  constructor(props){
    super(props);
    this.props = props;

    this.newPost = this.newPost.bind(this);
  }

  newPost(event){
    var self = this;
    event.preventDefault();
    $.ajax({
      url: '/api/post/',
      type: 'POST',
      data: self.state,
      dataType: 'json',
      success: function(response){
        redirectDispatcher.dispatch('/admin/posts/composer/'+response.data.hashid);
      },
      error: function(err){
        console.log(err);
      }
    });
  }

}

module.exports = NeonPostCenter;
