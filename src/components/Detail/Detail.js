/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Auth from '../Auth/auth';
import detailActions from '../../store/actions/detail-actions';
import If from '../If/If';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: '',
      method: '',
      value: '',
      selected: false,
      selectedId: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  showUpdate = (event, id) => {
    this.setState({ selected: !this.state.selected, selectedId: id });
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
        {
          detailsJSX.map((detail, i) => (
            <tr key={i}>
              <th>{this.props.material.name}</th>
              <td>{detail.reference}</td>
              <td>{detail.method}</td>
              <td>{detail.value}</td>
              <td>
                <Auth capability='update'>
                  <button onClick={(event) => this.showUpdate(event, detail._id)}>Update</button>

                  <If condition={this.state.selected === true && this.state.selectedId === detail._id}>
                    <div className='detail-update'>
                      <form onSubmit={(event) => this.handleUpdate(event, detail._id, this.props.material._id)}>

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
                        <button type='submit'>Submit new details</button>
                      </form>
                    </div>
                  </If>
                </Auth>
              </td>
              <td>
                <Auth capability='delete'>
                  <button onClick={(event) => this.handleDelete(event, detail._id)}>Delete</button>
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
    updateDetail: (data) => dispatch(detailActions.updateDetailAction(data)),
    deleteDetail: (data) => dispatch(detailActions.deleteDetailAction(data)),
  };
};

Detail.propTypes = {
  material: PropTypes.object,
  updateDetail: PropTypes.func,
  deleteDetail: PropTypes.func,
  details: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
