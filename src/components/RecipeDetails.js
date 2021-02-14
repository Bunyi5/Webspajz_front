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
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Error fetching recipe details!')
            }
            return res.json()
        }).then(responseData => {
            this.setState({
                recipe: responseData
            })
        }).then(() => {
            this.setStarPercentage()
        }).catch(err => {
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
        if (props.content != null && props.content.length > 0) {
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
        if (props.ingredients != null && props.ingredients.length > 0) {
            const recipeIngredientList = props.ingredients.map(item => {
                if (item.quantity === 0) {
                    return <li key={item.id}>{item.ingredient.name}</li>
                } else if (item.unit == null) {
                    return <li key={item.id}>{item.ingredient.name + ' (' + item.quantity + ' pc.)'}</li>
                } else {
                    return <li key={item.id}>{item.ingredient.name + ' (' + item.quantity + ' ' + item.unit + ')'}</li>
                }
            });
            return <div className='details-container'>
                <b>Ingredients:</b> <ul>{recipeIngredientList}</ul>
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
                <this.Ingredient ingredients={this.state.recipe.recipeIngredientList} />
            </div >
        );
    }
}