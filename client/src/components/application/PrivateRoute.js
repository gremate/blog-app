import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, exact, path }) {
    const jwtToken = useSelector(state => state.jwtToken);

    return <Route exact={exact} path={path} render={routeProps => jwtToken ? <Component {...routeProps} /> : <Redirect to="/" />} />;
}
