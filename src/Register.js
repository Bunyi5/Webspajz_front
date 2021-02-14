import React from 'react';
import history from './history';
import { useForm } from 'react-hook-form';

import './styles/Register.css'

function handleFormSubmit(userObject) {

    fetch('http://localhost:8080/saveNewUser', {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 409) {
            throw new Error('Username already exists!');
        } else if (!res.ok) {
            throw new Error('Can not save user!');
        }
        alert('Successful registration!')
        history.push('/')
    }).catch(err => {
        alert(err);
    })
};

function Form() {
    const { register, handleSubmit, getValues, errors } = useForm({mode: 'onChange'});
    const onSubmit = (userObject) => handleFormSubmit(userObject);

    return (
        <div>
            <div className='wrapper'>
                <form className='form-signin' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='form-signin-heading'>Register account</h2>
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
                    <div className='form-group'>
                        <input type='password'
                            name='passwordConfirmation'
                            className='form-control'
                            placeholder='confirm password'
                            ref={register({
                                required: 'Password confirmation is required!',
                                validate: {
                                    matchesPreviousPassword: (passwordConfirmation) => {
                                        const { password } = getValues();
                                        return password === passwordConfirmation || 'Passwords should match!'
                                    }
                                },
                                maxLength: { value: 20, message: 'Password confirmation cannot exceed 20 characters!' }
                            })}
                        />
                        {errors.passwordConfirmation && (<p className='errors'>{errors.passwordConfirmation.message}</p>)}
                    </div>
                    <div className='form-group'>
                        <input type='text'
                            name='firstName'
                            className='form-control'
                            placeholder='firstName'
                            ref={register({
                                required: 'First name is required!',
                                validate: {
                                    firstLetterIsUpperCase: (value) => value.match(/([A-Z]\S*\s?)*$/) || 'First name should start with a capital letter!',
                                    onlyContainsAlphabetical: (value) => value.match(/^([A-Z][a-z]*\s?)*$/) || 'Alphabetical characters only!'
                                },
                                maxLength: { value: 20, message: 'First name cannot exceed 20 characters!' }
                            })}
                        />
                        {errors.firstName && (<p className='errors'>{errors.firstName.message}</p>)}
                    </div>
                    <div className='form-group'>
                        <input type='text'
                            name='lastName'
                            className='form-control'
                            placeholder='lastName'
                            ref={register({
                                required: 'Last name is required!',
                                validate: {
                                    firstLetterIsUpperCase: (value) => value.match(/([A-Z]\S*\s?)*$/) || 'Last name should start with a capital letter!',
                                    onlyContainsAlphabetical: (value) => value.match(/^([A-Z][a-z]*\s?)*$/) || 'Alphabetical characters only!'
                                },
                                maxLength: { value: 20, message: 'Last name cannot exceed 20 characters!' }
                            })}
                        />
                        {errors.lastName && (<p className='errors'>{errors.lastName.message}</p>)}
                    </div>
                    <div className='form-group'>
                        <input type='text'
                            name='email'
                            className='form-control'
                            placeholder='email'
                            ref={register({
                                required: 'Email is required!',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Email format is not valid!'
                                },
                                maxLength: { value: 50, message: 'Email cannot exceed 50 characters!' }
                            })}
                        />
                        {errors.email && (<p className='errors'>{errors.email.message}</p>)}
                    </div>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
}

export default class Register extends React.Component {

    render() {
        return <Form />
    }
}