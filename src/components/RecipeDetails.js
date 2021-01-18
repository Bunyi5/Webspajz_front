import React from 'react';

import '../styles/RecipeDetails.css'

export default class RecipeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/recipe/' + this.props.location.state.id, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw Error('Error fetching profile picture!')
                }
                return response.json()
            })
            .then(responseData => {
                this.setState({
                    recipe: responseData
                })
                console.log(this.state.recipe)
            })
            .then(() => {
                this.setStarPercentage()
            })
            .catch(err => {
                console.log(err)
            })
    }

    setStarPercentage() {
        const starPercentage = (this.state.recipe.averageRating / 5) * 100;
        document.querySelector('.stars-inner').style.width = starPercentage + '%';
    }

    RecipeDetail(props) {
        if (props.content != null) {
            return <div className='details-container'>
                <b>{props.name}:</b> {props.content}
            </div>
        } else {
            return null;
        }
    }

    RecipeDetailList(props) {
        if (props.content != null) {
            const contentList = props.content.map(item =>
                <li key={item}>{item}</li>
            );
            return <div className='details-container'>
                <b>{props.name}:</b> <ul>{contentList}</ul>
            </div>
        } else {
            return null;
        }
    }


    Ingredient(props) {
        if (props.ingredients != null) {
            const ingredientList = props.ingredients.map(item => {
                if (item.quantity === 0) {
                    return <li key={item.id}>{item.ingredient}</li>
                } else if (item.unit == null) {
                    return <li key={item.id}>{item.ingredient + ' (' + item.quantity + ')'}</li>
                } else {
                    return <li key={item.id}>{item.ingredient + ' (' + item.quantity + ' ' + item.unit + ')'}</li>
                }
            });
            return <div className='details-container'>
                <b>Ingredients:</b> <ul>{ingredientList}</ul>
            </div>
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='recipe-details'>
                <img src={this.state.recipe.resizableImageUrl} alt=''></img>
                <h3 id='recipe-name'>{this.state.recipe.name}</h3>
                <div className='review-container'>
                    <div className='stars-outer'>
                        <div className='stars-inner'></div>
                    </div >
                    <div className='total-review'>({this.state.recipe.totalReviewCount})</div>
                </div>
                <this.RecipeDetail name='Description' content={this.state.recipe.description} />
                <this.RecipeDetail name='Difficulty' content={this.state.recipe.difficultyLevel} />
                <this.RecipeDetail name='Number of Servings' content={this.state.recipe.numberOfServings} />
                <this.RecipeDetailList name='Technique' content={this.state.recipe.techniqueList} />
                <this.RecipeDetailList name='Nutrition' content={this.state.recipe.nutritionList} />
                <this.RecipeDetailList name='Preparation Steps' content={this.state.recipe.preparationSteps} />
                <this.Ingredient ingredients={this.state.recipe.ingredientList} />
            </div >
        );
    }
}