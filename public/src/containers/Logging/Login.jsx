import React, { Component } from 'react';
import NavBarGuest from '../../components/FrontPage/FrontPageNavGuest';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/Login';

class Login extends Component {
  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
      user_token: localStorage.getItem('user_token'),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }


  render() {
    return (
      <div>
        <NavBarGuest />
        <div className="login">
          <form action="/login" method="/get" accept-charset="UTF-8" className="login-form" onSubmit={(e) => { e.preventDefault(); this.props.loginUser(this.state, this.props.history); }} autoComplete="on">
            <div className="login-header">Login</div>
            <div className="login-info-container">
              <div className="login-info">
                <div><label htmlFor="email">Email</label></div>
                <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
                <div><label htmlFor="password">password</label></div>
                <input
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  type="password"
                />
                <input id="login-button" type="submit" value="Login"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(null, { loginUser })(Login);
