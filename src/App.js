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
import {connect} from 'react-redux'
import Axios from 'axios';
import {getUser} from './ducks/reducer';

class App extends Component {
  
    
  componentDidMount(){
    Axios.get('/api/session')
    .then(res => {
      //console.log(res.data);
      if(res.data.id) {
        this.props.getUser(res.data)
        
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.props.user.id? <Nav/> : null}
         {/* <Nav/> */}
        {routes} 
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{getUser})(App);
