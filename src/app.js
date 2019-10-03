import React from 'react';

// Components
import Header from './components/Header/Header.jsx';
import Login from './components/Auth/login';
import Auth from './components/Auth/auth';
import Material from './components/Material/Material';
// import Detail from './components/Detail/Detail';

// Stylesheets

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <hr/>

        <Login />
        <hr />

        <Auth capability='read'>
          <Material />
        </Auth>
        <hr />

      </>
    );
  }
}

export default App;
