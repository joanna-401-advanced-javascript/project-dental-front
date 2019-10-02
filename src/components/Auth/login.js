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
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, type) => {
    event.preventDefault();
    this.login(this.state.username, this.state.password, type);
    this.setState({ username: '', password: '' });
  };

  login = (username, password, type) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      }),
    };

    if (type === 'signup') {
      options.body = JSON.stringify({ username, password });
      options.headers = new Headers({
        'Content-Type': 'application/json',
      });
    }

    fetch(`${API}/${type}`, options)
      .then((response) => response.text())
      .then((token) => this.validateToken(token))
      .catch(console.error);
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
            <input
              type="text"
              name='username'
              placeholder='Username'
              onChange={this.handleChange}
            />
            <input
              type="text"
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <button onClick={(event) => this.handleSubmit(event, 'signin')}>Sign In</button>
            <button onClick={(event) => this.handleSubmit(event, 'signup')}>Sign Up</button>
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
