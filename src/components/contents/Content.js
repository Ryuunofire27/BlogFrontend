import React, { Component } from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Post from './posts/Post';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './register/Register';
import Editor from './editor/Editor';
import axios from 'axios';

class Content extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      user: this.props.user,
      posts: null,
      postById: null
    };

    this.getPosts = this.getPosts.bind(this);
    this.getPostById = this.getPostById.bind(this);
  }

  componentWillMount(){
    this.setState({ user: this.props.user });
  }

  componentWillUnmount(){
    this.setState({ user: null });
  }

  componentWillReceiveProps(){
    this.setState({ user: this.props.user })
  }

  renderLogin(){
    return <Login user={this.props.user} loginController={this.props.loginController}/>;
  }

  getPosts(){
    axios
      .get('http://localhost:8080/post')
      .then((res) => {
        this.setState({
          posts: res.data.posts,
        });
      })
      .catch(err => console.log(err))
  }

  getPostById(id){
    axios
        .get('http://localhost:8080/post/' + id)
        .then((res) => {
          this.setState({
            postById: res.data.post,
          });
        })
        .catch(err => console.log(err))
  }

  logout(){
    this.props.logoutController();
    return <Redirect to="/"/>
  }
  render(){
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ () => <Home getPosts={this.getPosts} posts={this.state.posts}/>} />
          <Route exact path="/login" component={() => this.renderLogin()}/>
          <Route exact path="/logout" component={() => this.logout()}/>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/profile/write" component={ Editor } />
          <Route exact path="/post/:postId" component={ ({ match }) => <Post posts={this.state.posts} post={this.state.postById} user={this.state.user} match={match} getPost={this.getPostById}/>}/>
        </Switch>
      </main>
    );
  }
}

export default Content;