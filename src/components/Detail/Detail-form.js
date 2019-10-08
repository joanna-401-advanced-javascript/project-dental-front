import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import detailActions from '../../store/actions/detail-actions';
import If from '../If/If';

class DetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: '',
      reference: '',
      method: '',
      value: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      const matchingMaterials = this.props.selectedMaterials.filter(
        (material) => material.name.toLowerCase() === this.state.material.toLowerCase(),
      );
      const id = matchingMaterials[0]._id;
      this.props.addDetail({
        reference: this.state.reference,
        method: this.state.method,
        value: this.state.value,
        materialId: id,
      });
      this.setState({
        material: '', reference: '', method: '', value: '', 
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    return (
      <>
        <If condition={this.props.selectedMaterials.length > 0}>
          <div className='detail-add'>
            <h3>Add new details</h3>
            <form onSubmit={this.handleSubmit}>
              <label> Material
                <input
                  name='material'
                  type='text'
                  value={this.state.material}
                  onChange={this.handleChange}
                />
              </label>

              <label> Reference
                <input
                  name='reference'
                  type='text'
                  value={this.state.reference}
                  onChange={this.handleChange}
                />
              </label>

              <label> Method
                <input
                  name='method'
                  type='text'
                  value={this.state.method}
                  onChange={this.handleChange}
                />
              </label>
              <label> Value
                <input
                  name='value'
                  type='text'
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <button type='submit'>Add New Details</button>
            </form>
          </div>
        </If>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMaterials: state.selectedMaterials,
});

const mapDispatchToProps = (dispatch) => ({
  addDetail: (data) => dispatch(detailActions.addDetailAction(data)),
});

DetailForm.propTypes = {
  selectedMaterials: PropTypes.array,
  addDetail: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailForm);
