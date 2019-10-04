import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import detailActions from '../../store/actions/detail-actions';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: '',
      method: '',
      value: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, id) => {
    event.preventDefault();
    this.props.addDetail({
      reference: this.state.reference,
      method: this.state.method,
      value: this.state.value,
      materialId: id,
    });
    this.setState({ reference: '', method: '', value: '' });
  };

  handleUpdate = (event, id, materialId) => {
    event.preventDefault();
    this.props.updateDetail({
      _id: id,
      reference: this.state.reference,
      method: this.state.method,
      value: this.state.value,
      materialId,
    });
    this.setState({ reference: '', method: '', value: '' });
  };

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.deleteDetail({ _id: id });
  };

  render() {
    const detailsJSX = this.props.details.filter(
      (detail) => detail.materialId === this.props.material._id,
    );

    return (
      <>
        <form onSubmit={(event) => this.handleSubmit(event, this.props.material._id)}>
          <input
            name='reference'
            type='text'
            value={this.state.reference}
            onChange={this.handleChange}
            placeholder='Reference'
          />
          <input
            name='method'
            type='text'
            value={this.state.method}
            onChange={this.handleChange}
            placeholder='Method'
          />
          <input
            name='value'
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            placeholder='Value'
          />
          <button type='submit'>Add New Details</button>
        </form>
        <hr/>

        <h4>Details for {this.props.material.name}</h4>
        {
          detailsJSX.map((detail, i) => (
            <div key={i}>
              <ul>
                <h4>Fracture toughness</h4>
                <li>Reference: {detail.reference}</li>
                <li>Method: {detail.method}</li>
                <li>Value: {detail.value}</li>
              </ul>
              <button
                onClick={(event) => this.handleUpdate(event, detail._id, this.props.material._id)}
              >Update</button>
              <button onClick={(event) => this.handleDelete(event, detail._id)}>Delete</button>
            </div>
          ))
        }


      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDetail: (data) => dispatch(detailActions.addDetailAction(data)),
    updateDetail: (data) => dispatch(detailActions.updateDetailAction(data)),
    deleteDetail: (data) => dispatch(detailActions.deleteDetailAction(data)),
  };
};

Detail.propTypes = {
  material: PropTypes.object,
  addDetail: PropTypes.func,
  updateDetail: PropTypes.func,
  deleteDetail: PropTypes.func,
  details: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
