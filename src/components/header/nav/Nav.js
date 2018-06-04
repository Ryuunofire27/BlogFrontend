import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import NavUserArea from './nav-user-area/NavUserArea';

class Nav extends PureComponent{
  render(){
    return (
      <nav id="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admi">admi</Link></li>
          <li><Link to="/admi">admi</Link></li>
          <li><Link to="/admi">admi</Link></li>
        </ul>
        <NavUserArea user={this.props.user}/>
      </nav>
    );
  }
}

export default Nav;