import React, { Component } from 'react';
import history from './history';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const user_object = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            body: JSON.stringify(user_object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Incorrect username or password!');
            }
        }).then(res => {
            localStorage.setItem('authorization', res.token);
            this.checkAuthorization();
        }).catch(error => {
            alert(error);
        })
    };

    checkAuthorization() {
        fetch('http://localhost:8080/tryAuth', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => res.text())
            .then(res => {
                if (res === 'success') {
                    history.push('/recipes');
                } else {
                    alert('Authentication failure');
                }
            });
    }

    render() {
        return (
            <div>
                <div className='wrapper'>
                    <form className='form-signin' onSubmit={this.handleFormSubmit}>
                        <h2 className='form-signin-heading'>Please login</h2>
                        <div className='form-group'>
                            <input type='text'
                                name='username'
                                className='form-control'
                                placeholder='Username'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input type='password'
                                name='password'
                                className='form-control'
                                placeholder='password'
                                onChange={this.handleChange}
                            />
                        </div>
                        <button className='btn btn-lg btn-primary btn-block' type='submit'>
                            Login
            </button>
                    </form>
                </div>
            </div>
        );
    }
}