import React from 'react';
import history from '../../history';
import {Form} from "react-bootstrap";
import {useForm} from 'react-hook-form';

import '../../styles/Registartion.css'

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
}

function RegisterForm() {
    const {register, handleSubmit, getValues, errors} = useForm({mode: 'onChange'});
    const onSubmit = (userObject) => handleFormSubmit(userObject);

    return (
        <div className='form-container'>
            <Form className='form' onSubmit={handleSubmit(onSubmit)}>
                <img className='mb-4' src={process.env.PUBLIC_URL + '/logo.png'} alt='logo'/>
                <h1 className='h3 mb-3 fw-normal'>Create an account</h1>

                <Form.Group controlId='username'>
                    <Form.Label srOnly>Username</Form.Label>
                    <Form.Control type='text'
                                  name='username'
                                  placeholder='Username'
                                  ref={register({
                                      required: 'Username is required!',
                                      pattern: {
                                          value: /^[A-Za-z0-9]+$/,
                                          message: 'Alphabetical characters and numbers only!'
                                      },
                                      maxLength: {value: 20, message: 'Username cannot exceed 20 characters!'}
                                  })}
                    />
                    {errors.username && (<p className='errors'>{errors.username.message}</p>)}
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label srOnly>Password</Form.Label>
                    <Form.Control type='password'
                                  name='password'
                                  placeholder='Password'
                                  ref={register({
                                      required: 'Password is required!',
                                      maxLength: {value: 20, message: 'Password cannot exceed 20 characters!'}
                                  })}
                    />
                    {errors.password && (<p className='errors'>{errors.password.message}</p>)}
                </Form.Group>

                <Form.Group controlId='passwordConfirmation'>
                    <Form.Label srOnly>Confirm password</Form.Label>
                    <Form.Control type='password'
                                  name='passwordConfirmation'
                                  placeholder='Confirm password'
                                  ref={register({
                                      required: 'Password confirmation is required!',
                                      validate: {
                                          matchesPreviousPassword: (passwordConfirmation) => {
                                              const {password} = getValues();
                                              return password === passwordConfirmation || 'Passwords should match!'
                                          }
                                      },
                                      maxLength: {
                                          value: 20,
                                          message: 'Password confirmation cannot exceed 20 characters!'
                                      }
                                  })}
                    />
                    {errors.passwordConfirmation && (<p className='errors'>{errors.passwordConfirmation.message}</p>)}
                </Form.Group>

                <Form.Group controlId='firstName'>
                    <Form.Label srOnly>First name</Form.Label>
                    <Form.Control type='text'
                                  name='firstName'
                                  placeholder='First Name'
                                  ref={register({
                                      required: 'First name is required!',
                                      validate: {
                                          firstLetterIsUpperCase: (value) => value.match(/([A-Z]\S*\s?)*$/) || 'First name should start with a capital letter!',
                                          onlyContainsAlphabetical: (value) => value.match(/^([A-Z][a-z]*\s?)*$/) || 'Alphabetical characters only!'
                                      },
                                      maxLength: {value: 20, message: 'First name cannot exceed 20 characters!'}
                                  })}
                    />
                    {errors.firstName && (<p className='errors'>{errors.firstName.message}</p>)}
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label srOnly>Last name</Form.Label>
                    <Form.Control type='text'
                                  name='lastName'
                                  placeholder='Last Name'
                                  ref={register({
                                      required: 'Last name is required!',
                                      validate: {
                                          firstLetterIsUpperCase: (value) => value.match(/([A-Z]\S*\s?)*$/) || 'Last name should start with a capital letter!',
                                          onlyContainsAlphabetical: (value) => value.match(/^([A-Z][a-z]*\s?)*$/) || 'Alphabetical characters only!'
                                      },
                                      maxLength: {value: 20, message: 'Last name cannot exceed 20 characters!'}
                                  })}
                    />
                    {errors.lastName && (<p className='errors'>{errors.lastName.message}</p>)}
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label srOnly>Email</Form.Label>
                    <Form.Control type='text'
                                  name='email'
                                  placeholder='Email'
                                  ref={register({
                                      required: 'Email is required!',
                                      pattern: {
                                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                          message: 'Email format is not valid!'
                                      },
                                      maxLength: {value: 50, message: 'Email cannot exceed 50 characters!'}
                                  })}
                    />
                    {errors.email && (<p className='errors'>{errors.email.message}</p>)}
                </Form.Group>

                <button className='w-100 btn btn-lg' type='submit'>Register</button>
            </Form>

            <a href={'/'}>Log into your account</a>
        </div>
    );
}

export default class Register extends React.Component {

    render() {
        return <RegisterForm/>
    }
}
