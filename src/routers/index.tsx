import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import LoginPage from '../components/Login';

const basename = '/';

const RoutersConfig = () => {
    var redirect = '/login'
    if(localStorage.getItem("name")){
        redirect = '/404'
    }
    return (
        <Router basename={basename}>
            <Switch>
                <Route path='/login' exact={true} component={LoginPage} />
                <Route path="/" component={Home} />
                <Route path="/404" component={Home} />
                <Redirect to={redirect} />
            </Switch>
        </Router>
    );
}

export default RoutersConfig;
