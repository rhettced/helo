import React, {Component} from 'react';
import './DashboardDisplay.css';

class DashboardDisplay extends Component{

render(){
    return(
        <section>
            <h2>{this.props.title}</h2>
            <div className='post-by'>
                <p>by: {this.props.author} </p>
                <img src={this.props.img}/>
            </div>
        </section>
    );
}

}
export default DashboardDisplay;