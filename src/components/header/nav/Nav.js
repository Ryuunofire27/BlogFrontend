import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import NavUserArea from './nav-user-area/NavUserArea';
import { AppContext } from '../../AppContext';

export const Nav = () => {
  return (
    <nav id="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admi">admi</Link></li>
        <li><Link to="/admi">admi</Link></li>
        <li><Link to="/admi">admi</Link></li>
      </ul>
      <AppContext.Consumer>
        {app => <NavUserArea app={app}/>}
      </AppContext.Consumer>
    </nav>
  );
};