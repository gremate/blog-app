import { Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../components/application/Login';

export default (
    <Layout>
        <Switch>
            <Route exact path="/" component={Login} />
        </Switch>
    </Layout>
);
