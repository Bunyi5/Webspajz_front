import React from 'react';

import '../../styles/SearchBar.css'

export default class SearchBar extends React.Component {
  render() {
    return (
      <div className='search-container'>
        <input type='text' placeholder='Search...'></input>
        <button type='submit' className='btn btn-secondary'><i className='fa fa-search'></i></button>
      </div>
    );
  }
}