// ===== component/auth/login.js
// Auth Form for holding input values

// import React from 'react';
import { LoginContext } from './context';

const If = props => {
  return !!props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props){
    super(props);
    this.state = {username: '', password: ''};
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event, type) => {
    event.preventDefault();

  };

  render(){
    // return(
    // Get rest of code from demo
    // )
  }
}

export default Login;

// ===== component/auth/context.js
// Auth context provider, create methods and data required for authorization
import React from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const LoginContext = React.createContext();

const API = process.env.REACT_APP_API;

class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      token: null,
      user: {},
      login: this.login,
      logout: this.logout,
    };
  }

  //login
  login = (username, password, type) => {
    let options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      }),
    };

    if (type === 'signup'){
      options.body = JSON.stringify({username, password});
      options.headers = new Headers({
        'Content-Type': 'application/json',
      })
    }

    fetch(`${API}/${type}`, options)
      .then((response) => response.text())
      .then((token) => this.validateToken(token))
      .catch(console.error)

  };

  //logout
  logout() {

  }

  //validate token
  validateToken = (token) => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      this.setLoginState(true, token, user);

    } catch(error) {
      this.setLoginState(false, null, {})
    }
  };

  //state handling
  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({loggedIn, token, user});
  };

  componentDidMount() {
    //when component is born: validate tokens, set cookies
    const cookieToken = cookie.load('auth');
    this.validateToken(cookieToken);
  }

  render(){
    return(
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}


// ===== component/auth/auth.js
// conditionally rendered component wrapper
// i.e. plug into context, and render only if auth conditions are truthy

// import React from 'react';
import { LoginContext } from './context';

const If = props => {
  return !!props.condition ? props.children : null;
};

class Auth extends React.Component {

  static contextType = LoginContext;

  render(){
    let okToRender = false;
    try {
      okToRender = this.context.loggedIn &&
        (this.props.capability
          ? this.context.user.capabilities.includes(this.props.capability)
          : false);
    } catch(error) {
      console.warn('Not Authorized');
    }

    return(
      <If condition={okToRender}>
        {this.props.children}
      </If>
    )
  }
}

export default Auth;

// .env
// REACT_APP_SECRET='has to be same for it to unpack';
// REACT_APP_API= url for our back end

// app.js
import Auth from './components/auth/auth';
import LoginContext from './components/auth/context';

const Read = props => {
  return (
    <Auth capability='read'>
      <span>Read</span>
    </Auth>
  )
};

const Update = props => {
  return (
    <Auth capability='update'>
      <span>Update</span>
    </Auth>
  )
};

class App extends React.Component {
  render(){
    return(
      <LoginContext>
        <Read />
        <Update/>
      </LoginContext>
    )
  }
}








