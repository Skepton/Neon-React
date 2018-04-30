import {Dispatcher} from 'flux';

var getRouteDispatch = new Dispatcher();
var setRouteDispatch = new Dispatcher();

module.exports.getRouteDispatch = getRouteDispatch;
module.exports.setRouteDispatch = setRouteDispatch;
