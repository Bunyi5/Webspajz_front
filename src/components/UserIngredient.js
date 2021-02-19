import React from 'react';
import history from '../history';

import '../styles/UserIngredient.css'
import SearchBar from './SearchBar';

export default class UserIngredient extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userIngredients: [],
            needToSaveIngredients: [],
            filterByName: ''
        }

        this.button = {
            MINUS: 'minus',
            PLUS: 'plus'
        }

        this.quantity = 0;

        this.updateFilter = this.updateFilter.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload);

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
        }).catch(() => {
            history.push('/error');
        })
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload);
    }

    beforeunload = e => {
        if (this.state.needToSaveIngredients.length > 0) {
            e.preventDefault();
            e.returnValue = '';
        }
    }

    updateFilter(filterByName) {
        this.setState({
            filterByName: filterByName
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

    modifyNeedToSaveIngredientsState(state, ingredientId) {
        let found = false;

        const needToSaveIngredients = state.needToSaveIngredients.map(ingredient => {
            if (ingredient.ingredientId === ingredientId) {
                found = true;
                return {...ingredient, quantity: this.quantity};
            } else {
                return ingredient;
            }
        });

        if (!found) {
            return [...state.needToSaveIngredients, {ingredientId: ingredientId, quantity: this.quantity}];
        }

        return needToSaveIngredients;
    }

    modifyUserIngredientsState(state, ingredientId, sign) {
        return state.userIngredients.map(ingredient => {
            if (ingredient.ingredientId === ingredientId) {
                if (sign === this.button.PLUS) {
                    this.quantity = ingredient.quantity + 1;
                } else {
                    this.quantity = ingredient.quantity - 1;
                }
                return {...ingredient, quantity: this.quantity};
            } else {
                return ingredient;
            }
        });
    }

    modifyQuantitiesInStates(ingredientId, sign) {
        this.setState(state => {
            return {userIngredients: this.modifyUserIngredientsState(state, ingredientId, sign)};
        }, () => this.setState(state => {
            return {needToSaveIngredients: this.modifyNeedToSaveIngredientsState(state, ingredientId)};
        }));
    }

    isButtonDisabled(quantity, sign) {
        return (sign === this.button.MINUS && (quantity === null || quantity === 0))
            || (sign === this.button.PLUS && quantity === 10000);
    }

    renderButton(ingredient, sign) {
        return (
            <button className={'button ' + sign}
                    disabled={this.isButtonDisabled(ingredient.quantity, sign)}
                    onClick={() => {
                        this.modifyQuantitiesInStates(ingredient.ingredientId, sign)
                    }}>
                <i className={'fa fa-' + sign}/>
            </button>
        );
    }

    getQuantity(ingredient) {
        let quantity = 0;
        let unit = 'pc.';

        if (ingredient.quantity !== null) {
            quantity = ingredient.quantity;
        }

        if (ingredient.unit !== null) {
            unit = ingredient.unit;
        }

        return <span>{quantity} {unit}</span>
    }

    renderNameAndQuantity(ingredient) {
        let activeWhite = '';

        if (ingredient.quantity !== null && ingredient.quantity !== 0) {
            activeWhite = ' active-white';
        }

        return (
            <div className={'ingredient' + activeWhite}>
                {ingredient.ingredientName}
                <br/>
                {this.getQuantity(ingredient)}
            </div>
        );
    }

    renderIngredient(ingredient) {
        return (
            <div className='user-ingredient-container' key={'ingredient' + ingredient.ingredientId}>

                {this.renderButton(ingredient, this.button.MINUS)}
                {this.renderNameAndQuantity(ingredient)}
                {this.renderButton(ingredient, this.button.PLUS)}
            </div>
        );
    }

    renderIngredients() {
        return this.state.userIngredients
            .filter(ingredient => ingredient.ingredientName.toLowerCase().includes(this.state.filterByName))
            .map(ingredient => this.renderIngredient(ingredient));
    }

    render() {
        return (
            <div>
                <button className='save-button' onClick={() => {
                    this.saveUserIngredients()
                }}>
                    Save ingredients
                </button>

                <SearchBar filterMethod={this.updateFilter}/>

                <div className='all-user-ingredient-container'>
                    {this.renderIngredients()}
                </div>
            </div>
        );
    }
}
