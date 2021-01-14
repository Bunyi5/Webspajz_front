import React from 'react';
import './App.css';
import Navigation from './components/NavBar';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        <Routes />
      </div>
    );
  }
}

export default App;
