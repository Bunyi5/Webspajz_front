import React from 'react';
import SearchBar from './SearchBar'
import Profile from './Profile'

import '../../styles/Toolbar.css'

export default class Toolbar extends React.Component {
    render() {
        return (
            <div className='toolbar'>
                <SearchBar/>
                <Profile/>
            </div>
        );
    }
}
