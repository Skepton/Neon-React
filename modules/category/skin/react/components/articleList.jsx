import templateComponent from 'page/skin/react/components/template';
import routeStore from 'router/skin/react/helpers/routeStore';

class NeonArticleList extends templateComponent {
    constructor(props){
        super(props);
        this.state = routeStore.get();
        this.parseCategoryUrl();
    }

    setRouteData(data){
        this.setState(data);
        this.parseCategoryUrl();
    }

    parseCategoryUrl(){
        var params = this.state.params.categoryUrl.split('/');
        console.log(params);
    }

    componentWillMount(){
        var self = this;
        this.routeDispatcherToken = routeStore.getDispatcher.register(function(data){
            self.setRouteData(data);
        });
    }

    componentWillUnmount(){
        routeStore.getDispatcher.unregister(this.routeDispatcherToken);
    }
}

module.exports = NeonArticleList;