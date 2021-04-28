import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../components/application/Login';
import Posts from '../components/application/Posts';
import PrivateRoute from '../components/application/PrivateRoute';

export default (
    <Layout>
        <Switch>
            <Route component={Login} exact path="/" />
            <PrivateRoute component={Posts} exact path="/posts" />
        </Switch>
    </Layout>
);
