require('./style.css');
import React from "react";
import ReactDOM from "react-dom";
import {  Router, Route, hashHistory } from 'react-router';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { setState } from './action_creators';
import reducer from './reducer';
import App from './components/App';
import { LoadContainer } from './components/Load';
import remoteActionMiddleware from './remote_action_middleware';
const socket = io();
socket.on('state', state => {
  store.dispatch(setState(state))
});
const createStoreWithMiddleWare = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleWare(reducer);


const routes = <Route component={App}>
  <Route path="/" component={LoadContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
