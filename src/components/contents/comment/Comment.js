import React, { PureComponent } from 'react';
import axios from 'axios';

class Comment extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      comment: null,
      responses: null,
      textarea: null,
      isClicked: false,
      user: null,
      isLiked: this.props.user ? this.props.comment.like.indexOf(this.props.user._id) != -1 ? true : false : false,
      isDislike: this.props.user ? this.props.comment.dislike.indexOf(this.props.user._id) != -1 ? true : false : false
    };

    this.renderComment = this.renderComment.bind(this);
    //this.renderResponses = this.renderResponses.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSeeResponses = this.handleSeeResponses.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  componentWillMount(){
    this.setState({
      textarea: this.refs.textarea,
      comment: this.props.comment,
      user: this.props.user
    });
  }

  componentDidUpdate(){
    this.setState({
      user: this.props.user
    });
  }

  handleKeyDown(e){
    if(e.key === "Enter"){
      e.preventDefault();
      this.setState({ inputValue: this.state.textarea.value });
      this.state.textarea.value = '';
    }
  }

  handleSeeResponses(){
    this.setState({isClicked: !this.state.isClicked});
  }

  handleLike(){
    const add = this.state.isLiked ? -1 : 1;
    axios
      .put(`http://localhost:8080/user/${this.state.user._id}/comment/${this.state.comment._id}/like`, { add })
      .then((res) => {
        if(!res.data.err) this.setState({ isLiked: !this.state.isLiked, comment: res.data  });
      })
      .catch((err) => console.log(err));
    if(this.state.isDislike) {
      axios
        .put(`http://localhost:8080/user/${this.state.user._id}/comment/${this.state.comment._id}/dislike`, { add: -1 })
        .then((res) => {
          if(!res.data.err) this.setState({ isDislike: false, comment: res.data  });
        })
        .catch((err) => console.log(err));
    }
  }

  handleDislike(){
    const add = this.state.isDislike ? -1 : 1;
    axios
      .put(`http://localhost:8080/user/${this.state.user._id}/comment/${this.state.comment._id}/dislike`, { add })
      .then((res) => {
        if(!res.data.err) this.setState({ isDislike: !this.state.isDislike, comment: res.data  });
      })
      .catch((err) => console.log(err));
    if(this.state.isLiked) {
      axios
        .put(`http://localhost:8080/user/${this.state.user._id}/comment/${this.state.comment._id}/like`, { add: -1 })
        .then((res) => {
          if(!res.data.err) this.setState({ isLiked: false, comment: res.data })
        })
        .catch((err) => console.log(err));
    }
  }

  renderComment(){
    return (
      <div>
        <p>{this.state.comment.text}</p>
        <div className="comment-icons">
          {this.state.user ? this.state.user._id == this.state.comment.user ? 
            <span>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </span>
            : '' : ''
          }
          
          <span>
            {/*this.state.comment.responses.length*/}
            <i className="fa fa-comment-o" aria-hidden="true"></i>
          </span>
          {
            this.state.user ?
            <span>
              {this.state.comment.like.length}
              <i className={this.state.isLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"} aria-hidden="true" onClick={this.handleLike}></i>
            </span> : ''
          }
          {
            this.state.user ?
            <span>
              {this.state.comment.dislike.length}
              <i className={this.state.isDislike ? "fa fa-thumbs-down" : "fa fa-thumbs-o-down"} aria-hidden="true" onClick={this.handleDislike}></i>
            </span> : ''
          }
          
        </div>
        <div className="responses-see" onClick={this.handleSeeResponses}>
          {!this.state.isClicked ? 'Ver respuestas' : 'Ocultar respuestas'} 
          <i className={`fa ${!this.state.isClicked ? 'fa-chevron-down' : 'fa-chevron-up'}`} aria-hidden="true"></i>
        </div>
        {/*this.renderResponses()*/}
        <div className="comment-input">
          <textarea type="text" ref="textarea" placeholder="Put your Response" onKeyDown={this.handleKeyDown}/>
        </div>
      </div>
    );
  }

  /*renderResponses(){
    return (
      <div className={this.state.isClicked ? "responses" : "responses-no-visible"}>
        {this.state.comment.responses.length > 0 ? this.state.comment.responses.map((r) => {
          return (
            <div>
              {r.response}
            </div>
          );
        }) : <p>No hay respuestas</p>}
      </div>
    );
  }*/

  render(){
    return (
      <div className="comment">
        {this.renderComment()}
      </div>
    );
  }
}

export default Comment;