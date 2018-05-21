import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

const NavBarGuest = () => (
  <div>
    <Navbar brand='ReduxMailer' left>
      <div>
        <Link to="/login"><NavItem>Login</NavItem></Link>
        <Link to="/signup"><NavItem>Signup</NavItem></Link>
      </div>
    </Navbar>
  </div>
);

export default NavBarGuest;
