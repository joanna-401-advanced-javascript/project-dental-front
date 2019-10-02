/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const If = (props) => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component {
  render() {
    let okToRender = false;
    try {
      if (this.props.capability
        && this.props.users.user.capabilities.includes(this.props.capability)) {
        okToRender = true;
      }
    } catch (error) {
      console.warn('Not Authorized');
    }

    return (
      <If condition={okToRender}>
        <div>
          {this.props.children}
        </div>
      </If>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

Auth.propTypes = {
  capability: PropTypes.string,
  users: PropTypes.object,
  children: PropTypes.node,
};

export default connect(mapStateToProps, null)(Auth);
