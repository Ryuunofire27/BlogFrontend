import React, { PureComponent } from 'react';
import Comment from '../comment/Comment'
import MD from 'react-markdown';
import axios from 'axios';
import InputComment from '../InputComment';

/*class Post extends PureComponent{
  state = {
    comments: null,
    comment: null,
    textarea: null,
    commentsPage: 2
  }
  
  textareaRef = React.createRef();

  componentWillMount(){
    const postId = this.props.match.params.postId;
    const posts = this.props.app.state.posts;
    const post = this.props.app.state.post;
    (!post && (posts ? posts.map(p => p._id == postId && this.props.app.fn.setPost(p)) : this.props.app.fn.getPost(postId)));
    console.log(post);
    !this.props.app.state.comments && this.props.app.fn.getComments(postId);
  }

  componentWillUnmount(){
    this.props.app.fn.nullComments();
  }

  changeComment(e){
    this.setState({ comment: e.target.value });
  }

  onKeyDown(e){
    if(e.key == 'Enter'){
      e.preventDefault();
      const user = this.props.app.state.user;
      const post = this.props.app.state.post;
      const data = {
        text: this.state.comment
      };
      axios
        .request({
          baseURL: 'http://localhost:8080',
          url: user ? `/user/${user._id}/post/${post._id}/comment` : 
          `/post/${post._id}/comment`,
          data,
          method: 'POST',
          timeout: 3000 
        })
        .then((res) => {
          this.props.app.state.comments.push(res.data.comment);
          this.textareaRef.current.value = '';
          this.forceUpdate();
        })
        .catch(err => console.log(err));
    }
  }

  /*getComments = (id) => {
    axios
      .get(`http://localhost:8080/post/${id}/comment?limit=5&page=1`)
      .then((res) => {
        if (res.data.err) return ;
        this.setState({comments: res.data.comments})
      })
      .catch(err => console.log(err));
  }
*/
  /*renderPost = (post, user, comments) => {
    return post && comments ? (
      <section>
        <div className="post">
          <div className="post-data">
            <MD source={post.post}/>
          </div>
          <div className="post-comments">
            {comments.map((c) => {
              return (
                <Comment comment={c} key={c._id} user={user}/>
              );
            })}
            <div className="post-input-comment">
              <img src={user ? user.picture : 'http://mobi-wall.brothersoft.com/files/130130/l/12832802026453.jpg'}/>
              {user ? <span>{user.name.split(" ")[0]}</span> : ''}
              <textarea placeholder="Deja tu comentario" onChange={this.changeComment} onKeyDown={this.onKeyDown} ref={this.textareaRef}/>
            </div>
          </div>
        </div>
      </section>
    ) : '';
  }
  render(){
    return this.renderPost(this.props.app.state.post, this.props.app.state.user, this.props.app.state.comments);
  }
}

export default Post;*/

const renderPost = (post, user, comments, addComment) => {
  return post && comments ? (
    <section>
      <div className="post">
        <div className="post-data">
          <MD source={post.post}/>
        </div>
        <div className="post-comments">
          {comments.comments.map((c) => {
            return (
              <Comment comment={c} key={c._id} user={user}/>
            );
          })}
          <InputComment user={user} post={post} addComment={addComment} />
        </div>
      </div>
    </section>
  ) : '';
}

const getData = (props) => {
  const postId = props.match.params.postId;
  const posts = props.app.state.posts;
  const post = props.app.state.post;
  const comments = props.app.state.comments;
  (!post && (posts ? posts.map(p => p._id == postId && props.app.fn.setPost(p)) : props.app.fn.getPost(postId)))
  if(comments) {
    if(comments.post != postId) {
      props.app.fn.nullComments();
      props.app.fn.getComments(postId);
    }
  }else{
    props.app.fn.getComments(postId);
  }
}

export const Post = (props) => {
  getData(props);
  return renderPost(props.app.state.post, props.app.state.user, props.app.state.comments, props.app.fn.addComment);
};
