import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Signup from './Logging/Signup';
import FrontPageUser from './FrontPage/FrontPageUser';
import FrontPageGuest from './FrontPage/FrontPageGuest';
import Login from './Logging/Login';


class Router extends Component {
  constructor(props) {
    super();
    this.state = {};
  }


  render() {
    const { dispatch, errorMessage, isAuthenticated, history } = this.props;
    return isAuthenticated === false ? (
      <Switch>
        <Route exact path="/">
          <FrontPageGuest
            history={history}
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />
        </Route>
        <Route exact path="/login">
          <Login history={history} isAuthenticated={isAuthenticated} dispatch={dispatch}/>
        </Route>
        <Route path="/signup">
          <Signup isAuthenticated={isAuthenticated} history={history} />
        </Route>
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/">
          <FrontPageUser
            history={history}
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />
        </Route>
      </Switch>
    )
  }
};


const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage
  };
};

export default withRouter(connect(mapStateToProps)(Router));
