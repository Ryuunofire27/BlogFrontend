import React from 'react';
import axios from 'axios';
import Header from './header/Header';
import Content from './contents/Content';
import Footer from './footer/Footer';
import { history } from 'react-router-dom';

const AppContext = React.createContext();

class App extends React.Component{

  state = {
    user: null,
  }

  app = {
    states: this.state,
    fn: {
      loginController: this.loginController,
      logoutController: this.logoutController
    }
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

  render(){
    return (
      <AppContext.Provider value={app}>
        <Header user={this.state.user}/>
        <Content user={this.state.user} logoutController={this.logoutController} loginController={this.loginController}/>
        <Footer/>
      </AppContext.Provider>
    );
  }
}

export default App;