import React, {Component} from 'react';
import Axios from 'axios';
import './Form.css';
import {connect} from 'react-redux';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            title:'',
            img:'https://storyantics.com/images/images/en/imageNoImageSmall.gif',
            content:''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    componentDidMount(){
        if(!this.props.user.id){
            this.props.history.push('/')
        }
    }
    clearState = () => {
        this.setState({title: '', img: 'https://storyantics.com/images/images/en/imageNoImageSmall.gif', content: ''})
    }

    addPost = () => {
        const {title,img,content} = this.state;
        const {id} = this.props.user;
        Axios.post(`/api/posts`,{title,img,content,id})
        .then(res => (
            res.sendStatus(200)
        ))
        .catch(err => console.log(err))
        this.props.history.push('/');
        this.props.history.push('/dashboard');
        this.clearState();
    }

    render(){
        //console.log(this.state)
        return(
            <div className='form-main'>
                <h1>New Post</h1>
                <h4>Title:</h4>
                <input name='title'
                       onChange={(e) => this.handleInput(e)}
                       className='form-input'
                       value={this.state.title}/>
                <div>
                    <img src={this.state.img}
                         className='post-img'/>
                </div>
                <h4>Img URL:</h4>
                <input name='img'
                       onChange={(e) => this.handleInput(e)}
                       className='form-input'/>
                <h4>Content:</h4>
                <input className='content'
                       name='content'
                       onChange={(e) => this.handleInput(e)}
                       value={this.state.content}/>
                <div>
                    <button className='post-button'
                            onClick={this.addPost}>Post</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Form);