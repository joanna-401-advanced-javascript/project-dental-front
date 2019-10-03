import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
// import Detail from '../Detail/Detail';

// Actions
import materialActions from '../../store/actions/material-actions';

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
    this.props.addMaterial({ name: this.state.name });
    this.setState({ name: '' });
  };

  handleUpdate = (event, id) => {
    event.preventDefault();
    this.props.updateMaterial({ name: this.state.name, id });
    this.setState({ name: '' });
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(prevProps.materials !== this.props.materials){
  //     this.props.fetchMaterials();
  //   }
  // }

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
            <p>Name: {material.name}</p>
            <p>ID: {material._id}</p>
            {/* <Detail material={material}/> */}
            <button onClick={(event) => this.handleUpdate(event, material._id)}>Update</button>
            <button>Delete</button>
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
    addMaterial: (name) => dispatch(materialActions.addMaterialAction(name)),
    fetchMaterials: () => dispatch(materialActions.fetchMaterialsAction()),
    updateMaterial: (data) => dispatch(materialActions.updateMaterialAction(data)),
  };
};

Material.propTypes = {
  materials: PropTypes.array,
  addMaterial: PropTypes.func,
  fetchMaterials: PropTypes.func,
  updateMaterial: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
