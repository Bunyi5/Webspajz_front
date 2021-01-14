import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import MainPage from './components/MainPage'
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/recipes' exact component={MainPage} />
                </Switch>
            </Router>
        )
    }
}