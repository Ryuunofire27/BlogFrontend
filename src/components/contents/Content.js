import React, { Component } from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Post from './posts/Post';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './register/Register';
import WritePost from './admi/WritePost';
class Content extends Component{

  renderLogin(){
    return <Login user={this.props.user} loginController={this.props.loginController}/>;
  }

  logout(){
    this.props.logoutController();
    return <Redirect to="/"/>
  }
  render(){
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={() => this.renderLogin()}/>
          <Route exact path="/logout" component={() => this.logout()}/>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/profile/write" component={ WritePost } />
          <Route path="/post" component={ Post }/>
        </Switch>
      </main>
    );
  }
}

export default Content;