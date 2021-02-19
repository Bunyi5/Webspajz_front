import React from 'react';
import history from '../../history';
import {Form} from "react-bootstrap";
import {useForm} from 'react-hook-form';

import '../../styles/Registartion.css'

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
    }).catch(() => {
        alert('Server is not reachable!');
    })
}

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
            alert('Authentication failure!');
        }
    });
}

function LoginForm() {
    const {register, handleSubmit, errors} = useForm({mode: 'onChange'});
    const onSubmit = (userObject) => handleFormSubmit(userObject);

    return (
        <div className='form-container w-100'>
            <Form className='form' onSubmit={handleSubmit(onSubmit)}>
                <img className='mb-4' src={process.env.PUBLIC_URL + '/logo.png'} alt='logo'/>
                <h1 className='h3 mb-3 fw-normal'>Please log in</h1>

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

                <button className='w-100 btn btn-lg' type='submit'>Login</button>
            </Form>

            <a href={'/register'}>Create an account</a>
        </div>
    );
}

export default class Login extends React.Component {

    render() {
        return <LoginForm/>;
    }
}
