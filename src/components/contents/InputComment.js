import React, { PureComponent } from 'react';
import axios from 'axios';

class InputComment extends PureComponent {
  textareaRef = React.createRef();

  onKeyDown = (e) => {
    if(e.key == 'Enter'){
      e.preventDefault();
      const user = this.props.user;
      const post = this.props.post;
      const data = {
        text: this.textareaRef.current.value
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
          this.props.addComment(res.data.comment, post._id);
        })
        .catch(err => console.log(err));
    }
  }
  render(){
    const { user } = this.props;
    return (
      <div className="post-input-comment">
        <img src={user ? user.picture : 'http://mobi-wall.brothersoft.com/files/130130/l/12832802026453.jpg'}/>
        {user ? <span>{user.name.split(" ")[0]}</span> : ''}
        <textarea placeholder="Deja tu comentario" onChange={this.changeComment} onKeyDown={this.onKeyDown} ref={this.textareaRef}/>
      </div>
    )
  }
};

export default InputComment;