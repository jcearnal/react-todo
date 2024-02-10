import React from 'react';
import logo from '../logo.png';

function Header({ title }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{title}</h1>
    </header>
  );
}

export default Header;