import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

const Navigation = () => {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href='/'>Webspajz</Navbar.Brand> {/* Do not push! */}
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link href='/recipes'>Recipes</Nav.Link>
                    <Nav.Link href='/userIngredient'>Ingredients</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);
