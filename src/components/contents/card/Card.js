import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import MD from 'react-markdown';
class Card extends PureComponent{
  
  renderMD(){
    return this.props.postData ? <MD source={this.props.postData.extract}/> : <div></div>
  }
  render(){
    return (
      <div className="card">
        <div className="card-img">
          <Link to="">
            <img src={ this.props.postData ? this.props.postData.img : ""}/>
          </Link>
        </div>
        <div className="card-content">
          {this.renderMD()}
        </div>
      </div>
    );
  }
}

export default Card;