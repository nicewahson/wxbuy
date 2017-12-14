import React from 'react'
import {Router,Route,IndexRoute, browserHistory} from 'react-router';

const App = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').App);
    }, 'app');
};

const Home = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').Home);
    }, 'home');
};

const Detail = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').Detail);
    }, 'detail');
};
const BindPhone = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').BindPhone);
    }, 'bindphone');
};
const NotFound = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').NotFound);
    }, 'notfound');
};

var RouterMap = (
  <Router history={browserHistory}>
    <Route path="/" getComponent={App}>
      <IndexRoute getComponent={Home}/>
      <Route path='/detail' getComponent={Detail}/>
      <Route path='/bindphone' getComponent={BindPhone}/>
      <Route path='*' getComponent={NotFound}/>
    </Route>
  </Router>
);

export default RouterMap
