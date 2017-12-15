import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

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

const Center = (location, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers').Center);
    }, 'center');
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
        <Route path="/wxpurchase" getComponent={App}>
            <IndexRoute getComponent={Home}/>
            <Route path='/wxpurchase/wxcenter/build/wxpurchase/wxcenter' getComponent={Center}/>
            <Route path='/wxpurchase/wxcenter/build/wxpurchase/detail' getComponent={Detail}/>
            <Route path='/wxpurchase/wxcenter/build/wxpurchase/bindphone' getComponent={BindPhone}/>
            <Route path='*' getComponent={NotFound}/>
        </Route>
    </Router>
);

export default RouterMap
