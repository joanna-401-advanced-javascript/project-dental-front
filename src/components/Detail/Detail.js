import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import detailActions from '../../store/actions/detail-actions';
// import materialActions from "../../store/actions/material-actions";

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

  render() {
    const detailsJSX = this.props.details.filter(
      (detail) => detail.materialId === this.props.material._id,
    );

    return (
      <>
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
            </div>
          ))
        }

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
  };
};

Detail.propTypes = {
  material: PropTypes.object,
  addDetail: PropTypes.func,
  details: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
