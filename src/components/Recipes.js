import React from 'react';

import '../styles/Recipes.css'

export default class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            presentedRecipes: [{}]
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/recipes', {
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
                    presentedRecipes: responseData
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const recipes = this.state.presentedRecipes.map(recipes =>
            <div className='recipe-container' key={'recipe' + recipes.id}>
                <img src={recipes.iconImageUrl} alt='' ></img>
                <div className='recipe-name' >{recipes.name}</div>
            </div>
        );
        return (
            <div className='recipes-container'>
                {recipes}
            </div>
        );
    }
}