import React from 'react';
import { connect } from 'react-redux';

// Components
import Header from './components/Header/Header';
import Detail from './components/Details/Details';

// Actions
import { createMaterialAction } from "./actions/material-actions";

// Stylesheets


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = event => {
    this.setState({name: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createNewMaterial(this.state.name);
  };

  render() {
    return (
      <>
        <Header />

        <form onSubmit={this.handleSubmit}>
          <input
            name='material'
            type='text'
            value={this.state.name}
            onChange={this.handleChange}
            placeholder='Material name...'
          />
          <button type='submit'>Add New Material </button>
        </form>
        <hr />

        <h3>Materials</h3>
        {this.props.materials.map((material, i) =>
            <div>
              {material.name}
              <Detail material={material}/>
            </div>
          )
        }


      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    materials: state.materials,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewMaterial: (name) => {
      dispatch(createMaterialAction(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
