import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
// import Detail from '../Detail/Detail';
import Checkbox from '../Checkbox/Checkbox';
import Auth from '../Auth/auth';

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

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.deleteMaterial({ _id: id });
  };

  render() {
    return (
      <>
        <Auth capability='create'>
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
        </Auth>

        <h3>Materials</h3>
        {this.props.materials.map((material, i) => <div key={i}>
            <p>Name: {material.name}</p>
            <Checkbox id={material._id} name={material.name}/>

            <Auth capability='update'>
              <button onClick={(event) => this.handleUpdate(event, material._id)}>Update</button>
            </Auth>
            <Auth capability='delete'>
              <button onClick={(event) => this.handleDelete(event, material._id)}>Delete</button>
            </Auth>
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
    deleteMaterial: (data) => dispatch(materialActions.deleteMaterialAction(data)),
  };
};

Material.propTypes = {
  materials: PropTypes.array,
  addMaterial: PropTypes.func,
  fetchMaterials: PropTypes.func,
  updateMaterial: PropTypes.func,
  deleteMaterial: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
