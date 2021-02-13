import React from 'react';
import history from '../history'

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

    render() {
        const recipes = this.state.presentedRecipes.map(recipes =>
            <div className='recipe-container' key={'recipe' + recipes.id} onClick={() => history.push({
                pathname: '/recipe/' + recipes.id,
                state: {
                    id: recipes.id
                }
            })}>
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