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
    render(){
        return(
            <div className='single-post'>
                <div className='post-header'>
                    <h1>Title</h1>
                    <div className='author-display'>
                        <p>by: </p>
                        <img src={this.state.img}/>
                    </div>  
                </div>
                <div className='pic-post'>
                        <img src={this.state.img}/>
                        <p>Here goes all the post content</p>
                </div>
            </div>
        );
    }
}

export default Post;