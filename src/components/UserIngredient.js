import React from 'react';
import history from '../history';

import '../styles/UserIngredient.css'

export default class UserIngredient extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userIngredients: [],
            needToSaveIngredients: []
        }

        this.button = {
            MINUS: '-',
            PLUS: '+'
        }

        this.quantity = 0;
    }

    componentDidMount() {
        fetch('http://localhost:8080/ingredients', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Error fetching user ingredients!')
            }
            return res.json();
        }).then(responseData => {
            this.setState({
                userIngredients: responseData
            });
        }).catch(err => {
            console.log(err);
        })
    }

    saveUserIngredients() {
        fetch('http://localhost:8080/modifyQuantities', {
            method: 'POST',
            body: JSON.stringify(this.state.needToSaveIngredients),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => {
            if (!res.ok) {
                throw Error('Error during modifying user ingredients!');
            }
            alert('Ingredients saved!');
            history.push('/recipes');
        }).catch(err => {
            console.log(err);
        })
    }

    modifyUserIngredientsState(state, ingredientId, sign) {
        return state.userIngredients.map(ingredient => {
            if (ingredient.ingredientId === ingredientId) {
                if (sign === this.button.PLUS) {
                    this.quantity = ingredient.quantity + 1;
                } else {
                    this.quantity = ingredient.quantity - 1;
                }
                return { ...ingredient, quantity: this.quantity };
            } else {
                return ingredient;
            }
        });
    }

    modifyNeedToSaveIngredientsState(state, ingredientId) {
        let found = false;

        const needToSaveIngredients = state.needToSaveIngredients.map(ingredient => {
            if (ingredient.ingredientId === ingredientId) {
                found = true;
                return { ...ingredient, quantity: this.quantity };
            } else {
                return ingredient;
            }
        });

        if (!found) {
            return [...state.needToSaveIngredients, { ingredientId: ingredientId, quantity: this.quantity }];
        }

        return needToSaveIngredients;
    }

    modifyQuantitysInStates(ingredientId, sign) {
        this.setState(state => {
            return { userIngredients: this.modifyUserIngredientsState(state, ingredientId, sign) };
        }, () => this.setState(state => {
            return { needToSaveIngredients: this.modifyNeedToSaveIngredientsState(state, ingredientId) };
        }));
    }

    isButtonDiabled(ingredient, sign) {
        if ((sign === this.button.MINUS && (ingredient.quantity === null || ingredient.quantity === 0))
            || (sign === this.button.PLUS && ingredient.quantity === 10000)) {
            return true;
        } else {
            return false;
        }
    }

    getQuantity(ingredient) {
        let quantity;
        let unit;

        if (ingredient.quantity === null) {
            quantity = 0;
        } else {
            quantity = ingredient.quantity;
        }

        if (ingredient.unit === null) {
            unit = 'pc.';
        } else {
            unit = ingredient.unit;
        }

        return <div className='quantity'>{quantity} {unit}</div>;
    }

    renderIngredients() {
        return this.state.userIngredients.map(ingredient =>
            <div className='user-ingredient-container' key={'ingredient' + ingredient.ingredientId}>

                <button className='minus-button'
                    disabled={this.isButtonDiabled(ingredient, this.button.MINUS)}
                    onClick={() => { this.modifyQuantitysInStates(ingredient.ingredientId, this.button.MINUS) }}>-</button>

                <div className='ingredient-name'>{ingredient.ingredientName}</div>

                <button className='plus-button'
                    disabled={this.isButtonDiabled(ingredient, this.button.PLUS)}
                    onClick={() => { this.modifyQuantitysInStates(ingredient.ingredientId, this.button.PLUS) }}>+</button>

                <>{this.getQuantity(ingredient)}</>
            </div>
        );
    }

    render() {
        return (
            <div className='all-user-ingredient-container'>
                <button onClick={() => { this.saveUserIngredients() }}>Save ingredients</button>
                {this.renderIngredients()}
            </div>
        );
    }
}