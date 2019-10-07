import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Auth from '../Auth/auth';
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
        {/* <div className='detail-add'> */}
        {/*  <Auth capability='create'> */}
        {/*    <h3>Add new detail for {this.props.material.name}</h3> */}
        {/*    <form onSubmit={(event) => this.handleSubmit(event, this.props.material._id)}> */}
        {/*      <label> Reference */}
        {/*        <input */}
        {/*          name='reference' */}
        {/*          type='text' */}
        {/*          value={this.state.reference} */}
        {/*          onChange={this.handleChange} */}
        {/*        /> */}
        {/*      </label> */}

        {/*      <label> Method */}
        {/*        <input */}
        {/*          name='method' */}
        {/*          type='text' */}
        {/*          value={this.state.method} */}
        {/*          onChange={this.handleChange} */}
        {/*        /> */}
        {/*      </label> */}
        {/*      <label> Value */}
        {/*        <input */}
        {/*          name='value' */}
        {/*          type='text' */}
        {/*          value={this.state.value} */}
        {/*          onChange={this.handleChange} */}
        {/*        /> */}
        {/*      </label> */}
        {/*      <button type='submit'>Add New Details</button> */}
        {/*    </form> */}
        {/*  </Auth> */}
        {/* </div> */}

          {
            detailsJSX.map((detail, i) => (
              <tr key={i}>
                <th>{this.props.material.name}</th>
                <td>{detail.reference}</td>
                <td>{detail.method}</td>
                <td>{detail.value}</td>
                <td>
                  <Auth capability='update'>
                    <button onClick={
                      (event) => this.handleUpdate(event, detail._id, this.props.material._id)
                    }>Update</button>
                  </Auth>
                  <Auth capability='delete'>
                    <button onClick={
                      (event) => this.handleDelete(event, detail._id)
                    }>Delete</button>
                  </Auth>
                </td>
              </tr>
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
