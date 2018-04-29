import { HashRouter as Router, Route,Switch} from 'react-router-dom';
import React from 'react';
import {App, Login} from '../containers';
const routes= () => (
    <Router>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/App" component={App} />
            <Route path="/" component={Login} />
        </Switch>
    </Router>
)
export default routes;
