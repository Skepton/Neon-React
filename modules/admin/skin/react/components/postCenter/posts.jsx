import templateComponent from 'page/skin/react/components/template';
import Zepto from 'zepto';
import redirectDispatcher from 'router/skin/react/helpers/redirectDispatcher';
import { BrowserRouter } from 'react-router-dom';

class NeonPostCenterPosts extends templateComponent {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      posts: []
    }
  }

  componentWillMount(){
    this.getPostList();
  }

  getPostList(){
    var self = this;
    $.ajax({
      url: '/api/post/',
      type: 'GET',
      dataType: 'json',
      success: function(response){
        self.setState({'posts': response});
      },
      error: function(err){
        console.log(err);
      }
    });
  }

}

module.exports = NeonPostCenterPosts;
