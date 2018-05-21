import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/Login';
import NavBarGuest from '../../components/FrontPage/FrontPageNavGuest';

class Signup extends Component {
  constructor(props){
    super();
    this.state = {
      fullName: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value }, () => {
      console.log(this.state.email);
    });
  }


  render() {
    return (
      <div>
        <NavBarGuest />
        <div className="signup">
          <form action="/users" method="/post" accept-charset="UTF-8" className="signup-form" onSubmit={(e) => { e.preventDefault(); this.props.signupUser(this.state, this.props.history); }} autoComplete="on">
            <div className="signup-header">SIGN UP</div>
            <div className="signup-info-container">
              <div className="signup-info">
                <div><label htmlFor="fullName">Full Name</label></div>
                <input onChange={this.handleChange} name="fullName" value={this.state.fullName} type="text" />
                <div><label htmlFor="email">Email</label></div>
                <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
                <div><label htmlFor="password">password</label></div>
                <input
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  type="password"
                />
                <input id="signup-button" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(null, { signupUser })(Signup);
