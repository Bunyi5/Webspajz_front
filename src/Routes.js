import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import RecipeDetails from './components/RecipeDetails';
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/recipes' exact component={MainPage} />
                    <Route path='/recipe/:id' component={RecipeDetails} />
                </Switch>
            </Router>
        )
    }
}