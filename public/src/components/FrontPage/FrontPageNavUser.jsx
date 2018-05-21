import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../containers/Logging/Logout';

const NavBarUser = (props) => (
  <nav className="front-nav">
    <h1 id="home-logo">ReduxMailer <Logout id="logout-btn" history={props.history} dispatch={props.dispatch} isAuthenticated={props.isAuthenticated}/></h1>
  </nav>
);

export default NavBarUser;
