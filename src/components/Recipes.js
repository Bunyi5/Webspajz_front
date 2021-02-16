import React from 'react';
import history from '../history'

import '../styles/Recipes.css'

export default class Recipes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            presentedRecipes: []
        }

        this.completeness = {
            GREEN: 'GREEN',
            YELLOW: 'YELLOW',
            RED: 'RED'
        }

        this.renderByCompleteness = this.renderByCompleteness.bind(this);
        this.renderRecipesList = this.renderRecipesList.bind(this);
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
        }).catch(err => {
            console.log(err);
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
                <img src={recipe.iconImageUrl} alt=''/>
                <div className='recipe-name'>{recipe.name}</div>
            </div>
        )
    }

    renderRecipesList(completeness) {
        return this.state.presentedRecipes
            .filter(recipe => recipe.completeness === completeness)
            .map(recipe => this.renderRecipe(recipe));
    }

    renderLine(list, completeness) {
        if (list.length > 0) {
            return <hr className={'line' + completeness}/>
        }
    }

    renderByCompleteness() {
        const greenRecipes = this.renderRecipesList(this.completeness.GREEN);
        const yellowRecipes = this.renderRecipesList(this.completeness.YELLOW);
        const redRecipes = this.renderRecipesList(this.completeness.RED);

        return (
            <div>
                <div className='recipes-container'>
                    {this.renderLine(greenRecipes, this.completeness.GREEN)}
                    {greenRecipes}
                </div>
                <div className='recipes-container'>
                    {this.renderLine(yellowRecipes, this.completeness.YELLOW)}
                    {yellowRecipes}
                </div>
                <div className='recipes-container'>
                    {this.renderLine(redRecipes, this.completeness.RED)}
                    {redRecipes}
                </div>
            </div>
        )
    }

    render() {
        return this.renderByCompleteness();
    }
}
