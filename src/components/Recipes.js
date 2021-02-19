import React from 'react';
import history from '../history'

import '../styles/Recipes.css'
import SearchBar from "./SearchBar";

export default class Recipes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            presentedRecipes: [],
            filterByName: ''
        }

        this.updateFilter = this.updateFilter.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/recipes', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Error fetching presented recipes!')
            }
            return res.json();
        }).then(responseData => {
            this.setState({
                presentedRecipes: responseData
            });
        }).catch(() => {
            history.push('/error');
        })
    }

    updateFilter(filterByName) {
        this.setState({
            filterByName: filterByName
        })
    }

    renderRecipe(recipe) {
        return (
            <div className='recipe-container' key={'recipe' + recipe.id} onClick={() => history.push({
                pathname: '/recipe/' + recipe.id,
                state: {
                    id: recipe.id
                }
            })}>
                <span className={'dot ' + recipe.completeness}/>
                <img src={recipe.iconImageUrl} alt='recipe_picture'/>
                <div className='recipe-name'>{recipe.name}</div>
            </div>
        )
    }

    renderRecipesList() {
        return this.state.presentedRecipes
            .filter(recipe => recipe.name.toLowerCase().includes(this.state.filterByName))
            .map(recipe => this.renderRecipe(recipe));
    }

    render() {
        return (
            <div>
                <div className='dot-container'>
                    <div className='present-dot GREEN'>Makeable</div>
                    <div className='present-dot YELLOW'>Almost makeable</div>
                    <div className='present-dot RED'>Not makeable</div>
                </div>
                <SearchBar filterMethod={this.updateFilter}/>
                <div className='recipes-container'>
                    {this.renderRecipesList()}
                </div>
            </div>
        );
    }
}
