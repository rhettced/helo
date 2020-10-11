import React, {Component} from 'react';
import './Form.css';

export default class Form extends Component {
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

    render(){
        //console.log(this.state)
        return(
            <div className='form-main'>
                <h1>New Post</h1>
                <h4>Title:</h4>
                <input name='title'
                       onChange={(e) => this.handleInput(e)}/>
                <div>
                    <img src={this.state.img}/>
                </div>
                <h4>Img URL:</h4>
                <input name='img'
                       onChange={(e) => this.handleInput(e)}/>
                <h4>Content:</h4>
                <input className='content'
                       name='content'
                       onChange={(e) => this.handleInput(e)}/>
                <div>
                    <button className='post-button'>Post</button>
                </div>
            </div>
        );
    }
}