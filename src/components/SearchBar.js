import React from 'react';

import '../styles/SearchBar.css'
import {Form} from "react-bootstrap";

const SearchBar = ({filterMethod}) => {

    function clearSearchField() {
        document.getElementById('search-field').value = '';
        filterMethod('');
    }

    return (
        <Form className='search-container'>
            <Form.Group controlId='search-field'>
                <Form.Label srOnly>Search</Form.Label>
                <Form.Control type='text'
                              placeholder='Search...'
                              onChange={event => filterMethod(event.target.value)}
                />
            </Form.Group>
            <button id='search_button' type='button'
                    className='btn btn-sm'
                    onClick={clearSearchField}
            >
                <i className='fa fa-times'/>
            </button>
        </Form>
    );
}

export default SearchBar;
