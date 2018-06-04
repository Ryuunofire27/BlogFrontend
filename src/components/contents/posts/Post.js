import React, { Component } from 'react';
import Comment from '../comment/Comment'
import MD from 'react-markdown';
import axios from 'axios';

class Post extends Component{
  constructor(props){
    super(props);

    this.state = {
      postData: null,
      comments: [],
      comment: null,
      user: this.props.user,
      textarea: null,
      commentsPage: 2
    }

    this.changeComment = this.changeComment.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  componentWillMount(){
    const postId = this.props.match.params.postId;
    const posts = this.props.posts;
    const post = this.props.post;
    if(posts){
      posts.map((p) => {
        if(p._id == postId) this.setState({ postData: p });
      });
    }else if(post){
      this.setState({ postData: post });
    }else{
      this.props.getPost(postId);
    }
    axios
      .get(`http://localhost:8080/post/${postId}/comment?limit=5&page=1`)
      .then((res) => {
        if (res.data.err) return ;
        this.setState({comments: res.data.comments})
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.setState({ textarea: this.refs.textarea })
  }

  changeComment(e){
    this.setState({ comment: e.target.value });
  }

  onKeyDown(e){
    if(e.key == 'Enter'){
      e.preventDefault();
      const data = {
        text: this.state.comment
      };
      axios
        .request({
          baseURL: 'http://localhost:8080',
          url: this.state.user ? `/user/${this.state.user._id}/post/${this.state.postData._id}/comment` : 
          `/post/${this.state.postData._id}/comment`,
          data,
          method: 'POST',
          timeout: 3000 
        })
        .then((res) => {
          this.state.comments.push(res.data.comment);
          this.state.textarea.value = '';
          this.forceUpdate();
        })
        .catch(err => console.log(err));
    }
  }

  renderPost(){
    return this.state.postData ? (
      <section>
        <div className="post">
          <div className="post-data">
            <MD source={this.state.postData.post}/>
          </div>
          <div className="post-comments">
            {this.state.comments.map((c) => {
              return (
                <Comment comment={c} key={c._id} user={this.state.user}/>
              );
            })}
            <div className="post-input-comment">
              <img src={this.state.user ? this.state.user.picture : 'http://mobi-wall.brothersoft.com/files/130130/l/12832802026453.jpg'}/>
              {this.state.user ? <span>{this.state.user.name.split(" ")[0]}</span> : ''}
              <textarea placeholder="Deja tu comentario" onChange={this.changeComment} onKeyDown={this.onKeyDown} ref="textarea"/>
            </div>
          </div>
        </div>
      </section>
    ) : 
    <div></div>;
  }
  render(){
    return this.renderPost();
  }
}

export default Post;