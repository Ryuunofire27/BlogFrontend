import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

class NavUserArea extends PureComponent{
  constructor(props){
    super(props);
    
    this.state = {
      user: null,
      isClicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(){
    this.setState({
      user: this.props.user
    });
  }

  handleClick(){
    this.setState({isClicked: !this.state.isClicked});
  }

  logout(){
    return (
      <div className="header-user-area" onClick={this.handleClick}>
        <img className="header-user-area-img" src=""/>
        <span className="header-user-area-span">Carlos Daniel Villagomez Rodriguezasdasdas</span>
        <ul className={!this.state.isClicked ? "header-user-area-options-hidden" : "header-user-area-options"}>
          <li><Link to="/perfil">perfil</Link></li>
          <li><Link to="/logout">logout</Link></li>
        </ul>
      </div>
    );
  }

  login(){
    return (
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
      </ul>
    );
  }

  renderArea(){
    return this.state.user ?  this.logout() : this.login();
  }

  render(){
    return(
      <div className="user-area">
        {this.renderArea()}
      </div>
    )
  }
}

export default NavUserArea;