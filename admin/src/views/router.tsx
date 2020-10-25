import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './login/login';
import BizMain from '@views/biz/bizMain';

class Router extends React.Component<{}, {}> {
    componentDidMount() {

    }
    render() {
        return (
            <Switch>
                <Route  path="/login" component={Login} />
                <Route  path="/biz" component={BizMain} />
                <Route path='/' render={() => (<Redirect to='/login' />)} />
            </Switch>
        );
    }
}

export default Router;


/*
<Route  path="/login" component={Login} />
<Route  path="/register" component={Register} />
*/