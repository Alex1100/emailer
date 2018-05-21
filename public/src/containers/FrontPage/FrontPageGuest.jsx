import React, { Component } from 'react';
import Login from '../../containers/Logging/Login';
import NavBarGuest from '../../components/FrontPage/FrontPageNavGuest';
import { loginUser } from '../../actions/Login';


class FrontPageGuest extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;

    return (
      <div>
        <NavBarGuest />
        <p>Login/Register and send an Email</p>
      </div>
    );
  }
};


export default FrontPageGuest;
