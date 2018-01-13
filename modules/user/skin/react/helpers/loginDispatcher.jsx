import {Dispatcher} from 'flux';

var getUserDispatch = new Dispatcher();
var setUserDispatch = new Dispatcher();

module.exports.getUserDispatch = getUserDispatch;
module.exports.setUserDispatch = setUserDispatch;
