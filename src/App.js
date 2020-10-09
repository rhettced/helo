import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Auth from './Components/Auth/Auth';
import From from './Components/Form/Form';
import Post from './Components/Post/Post';
import Nav from './Components/Nav/Nav';
import Form from './Components/Form/Form';
import routes from './routes';

class App extends Component {
  render(){
    
    return (
      <div className="App">
         <Nav/>
        {routes} 
      </div>
    );
  }
}

export default App;
