import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

class EmailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      fullName: props.fullName,
      message: '',
      subject: '',
      recipientEmail: '',
      recipientName: '',
      showEmailSuccess: false,
      showEmailFailure: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  sendEmail(event){
    if(this.state.recipientEmail.length < 1 && this.state.recipientName.length < 1){
      this.setState({ showEmailFailure: true }, () => {return false;});
    } else {
      const axiosBod = {
        sender: this.state.email,
        fullName: this.state.fullName,
        subject: this.state.subject,
        recipientEmail: this.state.recipientEmail,
        recipientName: this.state.recipientName,
        message: this.state.message
      };

      axios.post('api/sendEmail', axiosBod)
        .then(res => {
          this.setState({ showEmailSuccess: true });
        })
        .catch(err => {
          this.setState({ showEmailFailure: true })
        })
    }
  }


  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;
    const { email, fullName, recipientEmail, recipientName, message } = this.state;

    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Enter Recipient Email Address</ControlLabel>
            <FormControl
              name="recipientEmail"
              type="text"
              placeholder="Send To"
              onChange={(event) => this.handleChange(event)}
            />
            <HelpBlock>i.e. steve@gmail.com</HelpBlock>
            <br/>
            <br/>
            <br/>
            <ControlLabel>Recipient Name</ControlLabel>
            <FormControl
              name="recipientName"
              type="text"
              placeholder="Enter Recipient's Name"
              onChange={(event) => this.handleChange(event)}
            />
            <br/>
            <br/>
            <br/>
            <ControlLabel>Subject</ControlLabel>
            <FormControl
              name="subject"
              type="text"
              placeholder="What's On Your Mind?"
              onChange={(event) => this.handleChange(event)}
            />
            <br/>
            <br/>
            <br/>
            <ControlLabel>Email Body</ControlLabel>
            <FormControl
              name="message"
              componentClass="textarea"
              placeholder="Enter Message"
              onChange={(event) => this.handleChange(event)}
            />
            <FormControl.Feedback/>
          </FormGroup>
          <Button onClick={(event) => {event.preventDefault(); this.sendEmail(event)}} type="submit">
            Send Email
          </Button>
        </form>
        <SweetAlert
          show={this.state.showEmailSuccess}
          title={this.state.subject}
          text={`Email Sent To ${this.state.recipientEmail}`}
          type="success"
          onConfirm={() => this.setState({ showEmailSuccess: false })}
          onEscapeKey={() => this.setState({ showEmailSuccess: false })}
        />
        <SweetAlert
          show={this.state.showEmailFailure}
          title="Error Sending Email"
          text={`Couldn't Send Email To ${this.state.recipientEmail}`}
          type="error"
          onConfirm={() => this.setState({ showEmailFailure: false })}
          onEscapeKey={() => this.setState({ showEmailFailure: false })}
        />
      </div>
    );
  }
};


export default EmailView;
