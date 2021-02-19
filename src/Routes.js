import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';

import Login from './components/registration/Login'
import Register from './components/registration/Register';
import NavBar from './components/NavBar';
import Recipes from "./components/Recipes";
import RecipeDetails from './components/RecipeDetails';
import UserIngredient from './components/UserIngredient';
import ErrorPage from "./components/Error";

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/error' component={ErrorPage}/>
                    <>
                        <NavBar/>
                        <Route path='/recipes' component={Recipes}/>
                        <Route path='/recipe/:id' component={RecipeDetails}/>
                        <Route path='/userIngredient' component={UserIngredient}/>
                    </>
                </Switch>
            </Router>
        )
    }
}
