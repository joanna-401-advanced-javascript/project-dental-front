import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import mainReducer from './reducers/main-reducer';

export default () => {
  return createStore(mainReducer, composeWithDevTools(
    applyMiddleware(thunk),
  ));
};
