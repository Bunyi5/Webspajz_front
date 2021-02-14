import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './Login'
import MainPage from './components/MainPage';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';
import history from './history';
import UserIngredient from './components/UserIngredient';
import Register from './Register'

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/register' exact component={Register} />
                    <>
                        <NavBar />
                        <Route path='/recipes' exact component={MainPage} />
                        <Route path='/recipe/:id' component={RecipeDetails} />
                        <Route path='/userIngredient' component={UserIngredient} />
                    </>
                </Switch>
            </Router>
        )
    }
}