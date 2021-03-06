import React, {Component} from 'react';
import './DashboardDisplay.css';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class DashboardDisplay extends Component{


postClick = () =>{

}

render(){
    console.log(this.props)
    return(
        <div className='box-w-delete' onClick={this.postClick}>
            <div>
                {this.props.author === this.props.user.username? <button className='delete-post-button' onClick={()=>this.props.deletePostFn(this.props.postId)}>Delete</button> : null}
            </div>
            <Link className='link' to={`/post/${this.props.postId}`}>
                <section className='postpost'>
                    <div className='post-title'>
                    
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className='post-by'>
                        <p>by: {this.props.author} </p>
                        <img src={this.props.img}/>
                    </div>
             </section>
            </Link>
        </div>
    );
}

}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps)(DashboardDisplay));