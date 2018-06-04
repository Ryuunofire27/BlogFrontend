import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../header/img/logo-node.png';
class Login extends PureComponent{

  usernameRef = React.createRef();
  psswRef = React.createRef();

  loginController = (e) =>{
    e.preventDefault();
    this.props.app.fn.loginController(this.usernameRef.current.value, this.psswRef.current.value);
  }
  
  renderLogin(user){
    return user ? <Redirect to="/"/> : (
        <div className="login">
          <div className="login-img">
            <img src={logo}/>
          </div>
          <form onSubmit={this.loginController}>
            <div>
              <span>Username</span>
              <input type="text" name="username" placeholder="username" ref={this.usernameRef} required/>
            </div>
            <br/>
            <div>
              <span>Password</span>
              <input type="password" name="password" placeholder="password" ref={this.psswRef} required/>
            </div>
            <br/>
            <input type="submit" value="Iniciar sesion"/>
          </form>
        </div>
      );
  }

  render(){
    return this.renderLogin(this.props.app.state.user);
  }
}

export default Login;