import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers';
import reduxThunk from 'redux-thunk';

export default function configureStore() {
  const store = createStore(createReducer(), applyMiddleware(reduxThunk))
  store.asyncReducers = {}
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
