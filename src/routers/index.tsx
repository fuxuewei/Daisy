import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import LoginPage from '../components/Login';
import {routerConfig} from './routerConfig'
import {FrontendAuth} from '../components/frontend/FrontendAuth'

const basename = '/';

const RoutersConfig = () => {
    var redirect = '/login'
    return (
        <Router basename={basename}>
            <Switch>
                <FrontendAuth config={routerConfig} />
                {/* <Route path='/login' exact component={LoginPage} />
                <Route path="/" component={Home} />
                <Route path="/404" exact component={Home} />
                <Redirect from="/*" to={redirect} /> */}
            </Switch>
        </Router>
    );
}

export default RoutersConfig;
