import React, {Component} from 'react';
import './DashboardDisplay.css';
import {Link} from 'react-router-dom';

class DashboardDisplay extends Component{

render(){
    console.log(this.props)
    return(
        <Link to={`/post/${this.props.postId}`}>
            <section>
                <h2>{this.props.title}</h2>
                <div className='post-by'>
                    <p>by: {this.props.author} </p>
                    <img src={this.props.img}/>
                </div>
            </section>
        </Link>
    );
}

}
export default DashboardDisplay;