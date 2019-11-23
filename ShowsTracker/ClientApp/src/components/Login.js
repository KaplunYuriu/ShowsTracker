import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Login';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import isEmpty from 'lodash-es/isEmpty';

import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: '',
      name: ''
    }

    this.tryLogin = this.tryLogin.bind(this);
    this.tryRegister = this.tryRegister.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;
    
    if (isLoggedIn) {
      this.props.history.push('/searchshows');
    }
  }

  getEmailValidation() {
    const { emailAddress } = this.state;

    if (emailAddress.length === 0)
      return 'error';

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailAddress))
      return 'error';

    return null;
  }

  getPasswordValidation() {
    const { password } = this.state;

    var passwordRegex = new RegExp('^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{6,}$');

    if (!passwordRegex.test(password))
      return 'error';
  }

  tryLogin(e) {
    e.preventDefault();

    const { emailAddress, password } = this.state;
    const { login } = this.props;

    login(emailAddress, password).then(() => {
      if (!isEmpty(this.props.error)) {
        alert(this.props.error);
      } else {
        this.props.history.push('/searchshows');
      }
    });
  }

  tryRegister(e) {
    e.preventDefault();

    const { emailAddress, password, name } = this.state;
    const { register, login } = this.props;

    register(emailAddress, password, name).then(() => {
      if (!isEmpty(this.props.error)) {
        alert(this.props.error);
      } else {
        login(emailAddress, password).then(() => this.props.history.push('/searchshows'))
      }
    });
  }

  render() {
    const isValid = this.getEmailValidation() !== 'error' && this.getPasswordValidation() !== 'error';

    return (
      <Row>
        <Col md={6}>
          <form className="login-form">
            <FormGroup
              controlId="emailAddress"
              validationState={this.getEmailValidation()} >

              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                required
                type="email"
                value={this.state.emailAddress}
                placeholder="Enter text"
                className="input-margin"
                onChange={(e) => this.setState({...this.state, emailAddress: e.target.value })}
              />
            </FormGroup>

            <FormGroup
              controlId="password"
              validationState={this.getPasswordValidation()} >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  required
                  type="password"
                  value={this.state.password}
                  placeholder="Enter password"
                  onChange={(e) => this.setState({...this.state, password: e.target.value })}
                />
              </FormGroup>

              <FormGroup
                controlId="name" >
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Enter Name"
                  onChange={(e) => this.setState({...this.state, name: e.target.value })}
                />
              </FormGroup>

              <Button type="submit" disabled={!isValid} className="action-button" onClick={this.tryLogin}>Login</Button>
              <Button type="submit" disabled={!isValid} className="action-button" onClick={this.tryRegister}> Register</Button>
          </form>
        </Col>
      </Row>);
  }
}

export default connect(
  state => state.user,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
