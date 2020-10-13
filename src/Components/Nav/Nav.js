import React, {Component} from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import {clearUser} from '../../ducks/reducer';
import {Redirect} from 'react-router-dom';

class Nav extends Component {

    logoutUser = () =>{
        Axios.post(`/api/logout`)
        .then(res =>{
            //console.log(res.data)
            this.props.clearUser();
        })
    }

    render(){
        console.log(this.props.user.profile_pic)
        return(
            <div className='menu-bar'>
                <img src={`${this.props.user.profile_pic}`}/>
                <h4 className='nav-username'>{this.props.user.username}</h4>
                <Link to='/dashboard'>
                    <button>Home</button>
                </Link>
                <Link to='/new'>
                    <button>New Post</button>
                </Link>
                <Link to='/'>
                    <button onClick={this.logoutUser}>Logout</button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{clearUser})(Nav)