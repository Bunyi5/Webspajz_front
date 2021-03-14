import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import '../styles/NavBar.css'
import Profile from "./Profile";

const Navigation = () => {
    return (
        <Navbar expand='sm' variant='dark'>
            <Navbar.Brand href='/recipes'>
                <img
                    alt="logo"
                    src={process.env.PUBLIC_URL + '/logo.png'}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Webspajz
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link href='/recipes'>Recipes</Nav.Link>
                    <Nav.Link href='/userIngredient'>Ingredients</Nav.Link>
                </Nav>
                <Profile/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);
