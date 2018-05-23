import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../header/img/logo-node.png';
class Login extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      username: null,
      password: null
    }

    this.loginController = this.loginController.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  loginController(e){
    e.preventDefault();
    this.props.loginController(this.state.username, this.state.password);
  }
  
  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value 
    });
  }

  renderLogin(){
    return this.props.user ? <Redirect to="/"/> : (
        <div className="login">
          <div className="login-img">
            <img src={logo}/>
          </div>
          <form onSubmit={this.loginController}>
            <div>
              <span>Username</span>
              <input type="text" name="username" placeholder="username" required onChange={this.handleInputChange}/>
            </div>
            <br/>
            <div>
              <span>Password</span>
              <input type="password" name="password" placeholder="password" required onChange={this.handleInputChange}/>
            </div>
            <br/>
            <input type="submit" value="Iniciar sesion"/>
          </form>
        </div>
      );
  }

  render(){
    return this.renderLogin();
  }
}

export default Login;