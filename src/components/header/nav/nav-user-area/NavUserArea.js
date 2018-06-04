import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

class NavUserArea extends PureComponent{
  state = {
    isClicked: false
  };

  handleClick = () => {
    this.setState({isClicked: !this.state.isClicked});
  }

  handleLogout = () => {
    this.props.app.fn.logoutController();
  }

  logout = (user) => {
    return (
      <div className="header-user-area" onClick={this.handleClick}>
        <img className="header-user-area-img" src={user.picture}/>
        <span className="header-user-area-span">Carlos Daniel Villagomez Rodriguez</span>
        <ul className={!this.state.isClicked ? "header-user-area-options-hidden" : "header-user-area-options"}>
          <li><Link to="/perfil">perfil</Link></li>
          <li><Link to="/" onClick={this.handleLogout}>logout</Link></li>
        </ul>
      </div>
    );
  }

  login = () => {
    return (
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
      </ul>
    );
  }

  renderArea = (user) => {
    return user ?  this.logout(user) : this.login();
  }

  render(){
    return(
      <div className="user-area">
        {this.renderArea(this.props.app.state.user)}
      </div>
    );
  }
}
export default NavUserArea;