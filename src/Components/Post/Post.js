import Axios from 'axios';
import React, {Component} from 'react';
import './Post.css';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: 'https://storyantics.com/images/images/en/imageNoImageSmall.gif',
            content: '',
            author:'',
            authorPicture:''
        }
    }

    componentDidMount(){
        this.getPost();
    }
    
    getPost = () => {
        Axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(res => {
            //console.log(res.data[0])
            this.setState({title: res.data[0].title,
                           img: res.data[0].img,
                           content: res.data[0].content,
                           author: res.data[0].username,
                           authorPicture: res.data[0].profile_pic});
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div className='single-post'>
                <div className='post-header'>
                    <h1>{this.state.title}</h1>
                    <div className='author-display'>
                        <p>by: {this.state.author}</p>
                        <img src={this.state.authorPicture}/>
                    </div>  
                </div>
                <div className='pic-post'>
                        <img src={this.state.img}/>
                        <p>{this.state.content}</p>
                </div>
            </div>
        );
    }
}

export default Post;