import React from 'react';
import { Nav } from './nav/Nav';
import logo from './img/logo-node.png';
export const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo}/>
      </div>
      <Nav/>
    </header>
  );
};
