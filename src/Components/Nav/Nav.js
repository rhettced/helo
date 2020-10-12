import React, {Component} from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component {
    render(){
        console.log(this.props.user.profile_pic)
        return(
            <div className='menu-bar'>
                <img src={`${this.props.user.profile_pic}`}/>
                <h4>{this.props.user.username}</h4>
                <Link to='/dashboard'>
                    <button>Home</button>
                </Link>
                <Link to='/new'>
                    <button>New Post</button>
                </Link>
                <Link to='/'>
                    <button>Logout</button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav)