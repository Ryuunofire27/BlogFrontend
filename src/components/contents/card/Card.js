import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import MD from 'react-markdown';

function RouterLink(props){
  return (
    props.href.match(/^(http?:)?\/\//)
    ? <a href={props.href}>{props.children}</a>
    : <Link to={props.href}>{props.children}</Link>
  );
}

class Card extends PureComponent{
  
  
  renderMD(){
    return this.props.postData ? <MD source={this.props.postData.extract} renderers={{Link: RouterLink}}/> : <div></div>
  }
  render(){
    return (
      <div className="card">
        <div className="card-img">
          <Link to={`/post/${this.props.postData._id}`}>
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