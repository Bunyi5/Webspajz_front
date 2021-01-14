import React from 'react';
import Toolbar from './toolbar/Toolbar'
import Recipes from './Recipes';

export default class MainPage extends React.Component {
  render() {
    return (
      <div className='mainpage'>
        <Toolbar />
        <Recipes />
      </div>
    );
  }
}