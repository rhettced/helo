import React, {Component} from 'react';
import './Dashboard.css';
import Axios from 'axios';
import DasboardDisplay from './DashboardDisplay';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    resetBtn = () => {
        this.setState({search: ''});
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts = () => {
        Axios.get(`/api/posts`)
        .then(res =>{
            //console.log(res.data);
            this.setState({posts: res.data});
        })
        .catch(err => console.log(err));
    }

    render(){
        //console.log(this.state.search);
        console.log(this.state.posts);
        let mappedPosts = this.state.posts.map((el,ind) => {
            return <DasboardDisplay key={ind} 
                                    title={el.title} 
                                    author={el.username} 
                                    id={el.id}
                                    img={el.img}
                                    postId={el.post_id}/>
        })
      
        return(
            <div className='dash-main'>
                <div className='search-bar'>
                    <div className='left-side'>
                        <input name='search'
                               onChange={(e) => this.handleInput(e)}
                               value={this.state.search}
                               placeholder='search by Title'/>
                        <button>Search</button>
                        <button onClick={this.resetBtn}>Reset</button>
                    </div>
                    <div className='right-side'>
                        <p>My Posts</p>
                        <input type='checkbox'
                               value={this.state.userposts}/>
                    </div>
                </div>
               {mappedPosts}

            </div>
        );
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);