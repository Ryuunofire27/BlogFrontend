import React from 'react';
import axios from 'axios';
import { Header } from './header/Header';
import { Content } from './contents/Content';
import Footer from './footer/Footer';
import { history } from 'react-router-dom';
import { AppContext } from './AppContext';

class App extends React.Component{

  state = {
    user: null,
    posts: null,
    post: null,
    comments: null
  }

  componentWillMount(){
    const user = localStorage.getItem('user');
    this.setState({ user: JSON.parse(user) });
  }

  loginController = (username, password) => {
    if( username && password){
      axios
        .request({
          baseURL: 'http://localhost:8080/user',
          url: '/login',
          data: {username, password},
          method: 'POST',
          timeout: 3000 
        })
        .then((res) => {
          this.setState({ user: res.data });
          localStorage.setItem('user', JSON.stringify(this.state.user));
        })
        .catch(err => alert('Hay problema al iniciar sesion'));
    }else{
      console.log('campos vacios');
    }
  }

  logoutController = () => {
    this.setState({
      user: null
    });
    localStorage.removeItem('user');
  }

  handlerRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .request({
        method: 'POST',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        baseURL: "http://localhost:8080/user"
      })
      .then(res => {
        this.setState({ user: res.data})
        localStorage.setItem('user', JSON.stringify(this.state.user));
      })
      .catch( err => console.log(err));
  }
  getPosts = () => {
    axios
      .get('http://localhost:8080/post')
      .then((res) => {
        this.setState({ posts: res.data.posts });
      })
      .catch(err => console.log(err))
  }

  getPost = (id) => {
    axios
        .get('http://localhost:8080/post/' + id)
        .then((res) => {
          this.setState({ post: res.data.post });
        })
        .catch(err => console.log(err))
  }

  setPost = (post) => {
    this.setState({ post });
  }

  nullPost = () => {
    console.log(this.state.post);
    this.state.post && this.setState({ post: null });
  }

  getComments = (id) => {
    axios
      .get(`http://localhost:8080/post/${id}/comment?limit=5&page=1`)
      .then((res) => {
        if (res.data.err) return ;
        this.setState({ 
          comments: {
            post: id,
            comments: res.data.comments}
          }
        );
      })
      .catch(err => console.log(err));
  }

  nullComments = () => {
    this.state.comments && this.setState({ comments: null });
  }

  addComment = (comment, id) => {
    const comments = this.state.comments.comments;
    if(comments){
      comments.push(comment);
      this.setState({ 
        comments: {
          post: id,
          comments: comments
        }
      });
    }else{
      this.setState({ 
        comments: {
          post: id,
          comments: [comment]
        }
      });
    }
  }

  render(){
    const fn = {
      loginController: this.loginController,
      logoutController: this.logoutController,
      getPosts: this.getPosts,
      getPost: this.getPost,
      setPost: this.setPost,
      nullPost: this.nullPost,
      handlerRegister: this.handlerRegister,
      getComments: this.getComments,
      nullComments: this.nullComments,
      addComment: this.addComment
    };
    return (
      <AppContext.Provider value={{state: this.state, fn}}>
        <Header/>
        <Content user={this.state.user}/>
        <Footer/>
      </AppContext.Provider>
    );
  }
}

export default App;