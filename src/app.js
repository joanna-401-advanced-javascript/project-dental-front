import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

// Components
import PropTypes from 'prop-types';
import Header from './components/Header/Header.jsx';
import Login from './components/Auth/login';
import Auth from './components/Auth/auth';
import Material from './components/Material/Material';
import Display from './components/Display/Display';
import { logoutAction } from './store/actions/user-actions';

const API = process.env.REACT_APP_API;

// Stylesheets
require('./stylesheets/reset.css');
require('./stylesheets/base.scss');
require('./stylesheets/layout.scss');
require('./stylesheets/table.scss');
require('./stylesheets/modules.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const currentCookie = cookie.load('auth');

    if (currentCookie !== null) {
      const options = {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${currentCookie}`,
        }),
      };

      fetch(`${API}/signin`, options)
        .then((response) => response.text())
        .then((token) => {
          if (token === '{"error":"Invalid User ID/Password"}') {
            this.props.logout();
          }
        });
    }
  };

  render() {
    return (
      <>
        <Header />

        <Login />

        <div className='main-display'>
          <Auth capability='read'>
            <Material />
          </Auth>

          <Auth capability='read'>
            <Display />
          </Auth>
        </div>

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
    logout: () => {
      dispatch(logoutAction());
    },
  };
};

App.propTypes = {
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
