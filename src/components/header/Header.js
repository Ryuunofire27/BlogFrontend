import React from 'react';
import Nav from './nav/Nav';
import logo from './img/logo-node.png';

class Header extends React.PureComponent{
  render(){
    return (
      <header>
        <div className="logo">
          <img src={logo}/>
        </div>
        <Nav user={this.props.user}/>
      </header>
    );
  }
}

export default Header;