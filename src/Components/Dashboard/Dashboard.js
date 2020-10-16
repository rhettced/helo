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
            userposts: true,
            boxChecked: 'checked'
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    resetBtn = () => {
        this.setState({search: '', userposts: !this.state.userposts}, () => {
            this.searchGetPosts();
        });
    }
    //finally works to logout user
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.props.history.push('/')
        }
    }
    componentDidMount(){
        if(!this.props.user.id){
            this.props.history.push('/')
        } else{
            this.searchGetPosts();
        }
    }

    checkBox = () => {
        this.setState({userposts: !this.state.userposts},() => {
            this.searchGetPosts();
        });
        console.log(this.state.userposts);
    }

    getPosts = () => {
        Axios.get(`/api/posts`)
        .then(res =>{
            //console.log(res.data);
            this.setState({posts: res.data});
        })
        .catch(err => console.log(err));
    }

    deletePost = (id) => {
        Axios.delete(`/api/posts/${id}`)
        .then(res => {
            this.setState({posts: res.data});
        })
        .catch(err => console.log(err))
        this.getPosts();
    }

    searchGetPosts = () => {
        const {id} = this.props.user;
        const {search,userposts} = this.state;
        Axios.get(`/api/posts/${id}?search=${search}&userposts=${userposts}`)
        .then(res =>{
            //console.log(res.data[0]);
            this.setState({posts: res.data});
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.state.posts);
        //console.log(this.state.posts);
        let mappedPosts = this.state.posts.map((el,ind) => {
            return <DasboardDisplay key={ind} 
                                    title={el.title} 
                                    author={el.username} 
                                    id={el.id}
                                    img={el.img}
                                    postId={el.post_id}
                                    deletePostFn={this.deletePost}/>
        })
      
        return(
            <div className='dash-main'>
                <div className='search-bar'>
                    <div className='left-side'>
                        <input name='search'
                               onChange={(e) => this.handleInput(e)}
                               value={this.state.search}
                               placeholder='search by Title'/>
                        <button onClick={this.searchGetPosts}>Search</button>
                        <button onClick={this.resetBtn}>Reset</button>
                    </div>
                    <div className='right-side'>
                        <p>My Posts</p>
                        <input type='checkbox'
                               checked={this.state.userposts}
                            //    value={this.state.userposts}
                               onChange={this.checkBox}/>
                    </div>
                </div>
               {mappedPosts}

            </div>
        );
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);