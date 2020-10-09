import React, { Component } from 'react';
import './Auth.css';
import Axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class Auth extends Component {
   constructor(){
       super();
       this.state ={
           username: '',
           password: ''
       }
   }
   
   handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
}

registerUser = () => {
    const {username, password} = this.state;
    Axios.post('/api/register',{username,password})
    .then(res => {
        this.props.getUser(res.data);
        this.props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
}

loginUser = () => {
    const {username, password} = this.state;
    Axios.post(`/api/login`,{username,password})
    .then(res => {
        this.props.getUser(res.data);
        this.props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
}

    render() {
        //console.log(this.state.username)
        return (
            <div className='auth-box'>
                <img src='https://www.pngitem.com/pimgs/m/127-1276046_crossed-arms-emoji-png-open-mouth-smiley-face.png' alt='logo' />
                <h1>HELO</h1>
                <div className='use-pass'>
                    <p>Username:</p>
                    <input name='username'
                           onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className='use-pass'>
                    <p>Password:</p>
                    <input name='password'
                           type='password'
                           onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className='button-box'>
                    <button onClick={this.loginUser}>Log In</button>
                    <button onClick={this.registerUser}>Register</button>
                </div>
            </div>
        );
    }
}

export default connect(null,{getUser})(Auth);