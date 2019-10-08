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
      temp: '',
    };
  }

  componentDidMount = () => {
    this.props.fetchMaterials();
  };

  handleTempChange = (event) => {
    this.setState({ temp: event.target.value });
  };

  handleUpdate = (event, id) => {
    event.preventDefault();
    this.props.updateMaterial({ name: this.state.temp, id });
    this.setState({ temp: '' });
  };

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.deleteMaterial({ _id: id });
  };

  render() {
    return (
      <>
        <div className='material-display'>
          <h2>Materials</h2>
          {this.props.materials.map((material, i) => <div key={i} className='material-each'>
            <Checkbox id={material._id} name={material.name}/>
            <h4>{material.name}</h4>

            <Auth capability='update'>
              <label> Change material name
                <input
                  name='material'
                  type='text'
                  value={this.state.temp}
                  onChange={this.handleTempChange}
                />
              </label>
              <button onClick={(event) => this.handleUpdate(event, material._id)}>Update</button>
            </Auth>
            <Auth capability='delete'>
              <button onClick={(event) => this.handleDelete(event, material._id)}>Delete</button>
            </Auth>
          </div>)
          }
        </div>
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
    fetchMaterials: () => dispatch(materialActions.fetchMaterialsAction()),
    updateMaterial: (data) => dispatch(materialActions.updateMaterialAction(data)),
    deleteMaterial: (data) => dispatch(materialActions.deleteMaterialAction(data)),
  };
};

Material.propTypes = {
  materials: PropTypes.array,
  fetchMaterials: PropTypes.func,
  updateMaterial: PropTypes.func,
  deleteMaterial: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
