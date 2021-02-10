import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './Login'
import MainPage from './components/MainPage';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <>
                        <NavBar />
                        <Route path='/recipes' exact component={MainPage} />
                        <Route path='/recipe/:id' component={RecipeDetails} />
                    </>
                </Switch>
            </Router>
        )
    }
}