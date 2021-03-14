import React from 'react';

import '../styles/SearchBar.css'
import {Form} from "react-bootstrap";

const SearchBar = ({filterMethod}) => {

    function clearSearchField() {
        document.getElementById('search-field').value = '';
        document.getElementById('search_button').hidden = true;
        filterMethod('');
    }

    function setToVisible() {
        document.getElementById('search_button').hidden = (document.getElementById('search-field').value === '');
    }

    return (
        <Form className='search-container'>
            <Form.Group controlId='search-field'>
                <Form.Label srOnly>Search</Form.Label>
                <Form.Control type='text'
                              placeholder='Search...'
                              onChange={event => {
                                  filterMethod(event.target.value)
                                  setToVisible()
                              }}
                />
            </Form.Group>
            <button id='search_button' type='button'
                    className='btn btn-sm'
                    onClick={clearSearchField}
                    hidden={true}
            >
                <i className='fa fa-times'/>
            </button>
        </Form>
    );
}

export default SearchBar;
