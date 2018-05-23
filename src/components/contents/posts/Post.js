import React, { PureComponent } from 'react';
import MD from 'react-markdown';
import axios from 'axios';

class Post extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      postData: null
    }
  }
  componentDidMount(){
    console.log(location);
    axios
      .get('http://localhost:8080/post'+location.pathname.replace("/post", ""))
      .then((res) => {
        this.setState({
          postData: res.data,
        });
      })
      .catch(err => console.log(err))
  }
  renderPost(){
    return this.state.postData ? (
      <section>
        <MD source={this.state.postData.post}/>
        <ul>
          {this.state.postData.comments.map((c) => {
            return <li>{c.comment}</li>
          })}
        </ul>
      </section>
    ) : 
    <div></div>;
  }
  render(){
    return this.renderPost();
  }
}

export default Post;