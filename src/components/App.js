import React from 'react';
import axios from 'axios';
import Header from './header/Header';
import Content from './contents/Content';
import Footer from './footer/Footer';
import { history } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      user: null,
    }

    this.loginController = this.loginController.bind(this);
    this.logoutController = this.logoutController.bind(this);
  }

  componentDidMount(){
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password')
    let user = null;
    if(username && password){
      user = {
        username,
        password
      }
    }
    this.setState({user});
  }

  loginController(username, password){
    if( username && password){
      axios
        .post('http://localhost:8080/user/login', {username, password})
        .then((res) => {
          this.setState({user: res.data});
          localStorage.setItem('username', this.state.user.username);
          localStorage.setItem('password', this.state.user.password);
        })
        .catch(err => console.log(err));
    }else{
      console.log('campos vacios');
    }
  }

  logoutController(){
    this.setState({
      user: null
    });
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  render(){
    return (
      <div>
        <Header user={this.state.user}/>
        <Content user={this.state.user} logoutController={this.logoutController} loginController={this.loginController}/>
        <Footer/>
      </div>
    );
  }
}

export default App;