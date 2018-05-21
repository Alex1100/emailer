import React, { Component } from 'react';
import {logoutUser} from '../../actions/Login';

class Logout extends Component {
  constructor(props){
    super();
    this.state = {};
  }

  render() {
    return (
      <button onClick={() => this.props.dispatch(logoutUser()) } className="btn btn-primary">
        Logout
      </button>
    );
  }
}

export default Logout;
