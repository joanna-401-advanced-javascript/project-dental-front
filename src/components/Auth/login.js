/* eslint-disable no-console */

import React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

import { changeStateAction, logoutAction } from '../../store/actions/user-actions';

const API = process.env.REACT_APP_API;

const If = (props) => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passcode: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, type) => {
    event.preventDefault();
    this.login(this.state.username, this.state.password, this.state.passcode, type);
    this.setState({ username: '', password: '', passcode: '' });
  };

  login = (username, password, passcode, type) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      }),
    };

    let role = '';

    if (passcode === 'elephant') {
      role = 'editor';
    } else if (passcode === 'anteater') {
      role = 'admin';
    } else {
      role = 'user';
    }

    if (type === 'signup') {
      options.body = JSON.stringify({ username, password, role });
      options.headers = new Headers({
        'Content-Type': 'application/json',
      });
    }

    console.log('OPTIONS', options);

    fetch(`${API}/${type}`, options)
      .then((response) => response.text())
      .then((token) => this.validateToken(token))
      .catch(this.props.setUserState(false, null, {}));
  };

  validateToken = (token) => {
    try {
      const user = jwt.verify(token, process.env.REACT_APP_SECRET);
      this.props.setUserState(true, token, user);
    } catch (error) {
      this.props.setUserState(false, null, {});
    }
  };

  logout = () => {
    this.props.setUserState(false, null, {});
  };

  componentDidMount = () => {
    const cookieToken = cookie.load('auth');
    this.validateToken(cookieToken);
  };

  render() {
    return (
      <>
        <If condition={this.props.users.loggedIn}>
          <button onClick={this.logout}>Log Out</button>
        </If>

        <If condition={!this.props.users.loggedIn}>
          <form>
            <label>Username
              <input
                type="text"
                name='username'
                placeholder='Username'
                onChange={this.handleChange}
              />
            </label>
            <label>Password
              <input
                type="text"
                name='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </label>
            <label> Passcode
              <input
                type="text"
                name='passcode'
                placeholder='Passcode here'
                onChange={this.handleChange}
              />
            </label>
            <button onClick={(event) => this.handleSubmit(event, 'signup')}>Sign Up</button>
          </form>

          <form>
            <label>Username
              <input
                type="text"
                name='username'
                placeholder='Username'
                onChange={this.handleChange}
              />
            </label>
            <label>Password
              <input
                type="text"
                name='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </label>
            <button onClick={(event) => this.handleSubmit(event, 'signin')}>Sign In</button>
          </form>
        </If>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserState: (loggedIn, token, user) => {
      cookie.save('auth', token);
      dispatch(changeStateAction(loggedIn, token, user));
    },
    logout: () => {
      dispatch(logoutAction());
    },
  };
};

Login.propTypes = {
  setUserState: PropTypes.func,
  users: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
