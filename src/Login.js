import React from 'react';
import history from './history';
import { useForm } from 'react-hook-form';

import './styles/Login.css'

function handleFormSubmit(userObject) {

    fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        body: JSON.stringify(userObject),
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
        checkAuthorization();
    }).catch(err => {
        alert(err);
    })
};

function checkAuthorization() {

    fetch('http://localhost:8080/tryAuth', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authorization')
        }
    }).then(res => {
        if (res.ok) {
            history.push('/recipes');
        } else {
            alert('Authentication failure');
        }
    });
}

function Form() {
    const { register, handleSubmit, errors } = useForm({mode: 'onChange'});
    const onSubmit = (userObject) => handleFormSubmit(userObject);

    return (
        <div>
            <div className='wrapper'>
                <form className='form-signin' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='form-signin-heading'>Please login</h2>
                    <div className='form-group'>
                        <input type='text'
                            name='username'
                            className='form-control'
                            placeholder='username'
                            ref={register({
                                required: 'Username is required!',
                                pattern: { value: /^[A-Za-z0-9]+$/, message: 'Alphabetical characters and numbers only!' },
                                maxLength: { value: 20, message: 'Username cannot exceed 20 characters!' }
                            })}
                        />
                        {errors.username && (<p className='errors'>{errors.username.message}</p>)}
                    </div>
                    <div className='form-group'>
                        <input type='password'
                            name='password'
                            className='form-control'
                            placeholder='password'
                            ref={register({
                                required: 'Password is required!',
                                maxLength: { value: 20, message: 'Password cannot exceed 20 characters!' }
                            })}
                        />
                        {errors.password && (<p className='errors'>{errors.password.message}</p>)}
                    </div>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Login</button>
                </form>
                <button className='btn btn-lg btn-primary btn-block' onClick={() => history.push('/register')}>Register</button>
            </div>
        </div>
    );
}

export default class Login extends React.Component {

    render() {
        return <Form />;
    }
}