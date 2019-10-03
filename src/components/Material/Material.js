import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
// import Detail from '../Detail/Detail';

// Actions
// import { createMaterialAction } from '../../store/actions/material-actions';
import materialActions from '../../store/actions/material-actions';

// const API = process.env.REACT_APP_API;

class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount = () => {
    this.props.fetchMaterials();
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createNewMaterial(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <>
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
        {this.props.materials.map((material, i) => <div key={i}>
          {material.name}
          {/* <Detail material={material}/> */}
        </div>)
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    materials: state.materials,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewMaterial: (name) => dispatch(materialActions.createMaterialAction(name)),
    fetchMaterials: () => dispatch(materialActions.fetchMaterialsAction()),
  };
};

Material.propTypes = {
  createNewMaterial: PropTypes.func,
  fetchMaterials: PropTypes.func,
  materials: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
