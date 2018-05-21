import React, { Component } from 'react';
import Login from '../../containers/Logging/Login';
import NavBarUser from '../../components/FrontPage/FrontPageNavUser';
import EmailView from '../Emailing/EmailView';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

class FrontPageUser extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated, email, fullName } = this.props;
    return (
      <div>
        <NavBarUser dispatch={dispatch} history={history} isAuthenticated={isAuthenticated}/>
        <EmailView email={email} fullName={fullName} dispatch={this.props.dispatch} history={history} isAuthenticated={isAuthenticated} />
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;
  const email = localStorage.getItem('email');
  const fullName = localStorage.getItem('fullName');
  return {
    isAuthenticated,
    errorMessage,
    email,
    fullName,
  };
};

export default withRouter(connect(mapStateToProps)(FrontPageUser));
