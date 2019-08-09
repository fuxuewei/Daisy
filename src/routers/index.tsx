import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../components/Home';
import LoginPage from '../components/Login';
import Table from '../components/topics/Table';
const basename = '/';

const RoutersConfig = () => {
    if(localStorage.getItem("name")){
        var redirect = '/404'
    }else{
        var redirect = '/login'
    }
    return (
        <Router basename={basename}>
            <Switch>
                <Route path='/table' component={HomePage} />
                <Route path='/login' exact={true} component={LoginPage} />
                <Route path='/home' component={HomePage} />
                <Route path="/404" component={HomePage} />
                <Redirect to={redirect} />
            </Switch>
        </Router>
    );
}

export default RoutersConfig;
