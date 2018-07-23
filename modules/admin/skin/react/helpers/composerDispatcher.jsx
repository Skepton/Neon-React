import {Dispatcher} from 'flux';

var getComposerDispatch = new Dispatcher();
var setComposerDispatch = new Dispatcher();

module.exports.getComposerDispatch = getComposerDispatch;
module.exports.setComposerDispatch = setComposerDispatch;
