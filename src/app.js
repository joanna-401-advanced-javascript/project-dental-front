import React from 'react';

// Components
import Header from './components/Header/Header.jsx';
import Login from './components/Auth/login';
import Auth from './components/Auth/auth';
import Material from './components/Material/Material';
import Display from './components/Display/Display';
// import Detail from './components/Detail/Detail';


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

        <Display />

        {/* { */}
        {/*  this.props.selectedMaterials.forEach((material) => { */}
        {/*    this.props.details.map((detail) => { */}
        {/*      if () { */}
        {/*        return ( */}
        {/*          <Detail */}
        {/*            detail={detail} */}
        {/*          /> */}
        {/*        ) */}
        {/*      } */}
        {/*    }) */}
        {/*  }) */}
        {/* } */}

        {/* { */}
        {/*  this.state.selectedMaterials.map((selection) => */}
        {/*    /!*<Detail material={selection}/>*!/ */}
        {/*  ) */}
        {/* } */}
        {/* <p>{this.state.materials}</p> */}
      </>
    );
  }
}

// export default connect(mapStateToProps, null)(App);
export default App;
