import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { createDetailAction } from '../../actions/detail-actions';

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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createNewDetail(
      this.props.material.id,
      this.state.reference,
      this.state.method,
      this.state.value,
    );
    this.setState({reference: '', method: '', value: ''});
  };

  render() {
    let detailsJSX = null;
    if (Object.keys(this.props.details).length > 0) {
      const { id } = this.props.material;
      const targetDetails = this.props.details[id];
      detailsJSX = targetDetails.map((detail, i) => (
        <div key={i}>
          <li>Reference: {detail.reference}</li>
          <li>Method: {detail.method}</li>
          <li>Value: {detail.value}</li>
        </div>
      ));
    }

    return (
      <>
        <h4>Details for {this.props.material.name}</h4>
        {detailsJSX}
        <form onSubmit={this.handleSubmit}>
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
          <button type='submit'>Submit Details</button>
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
    createNewDetail: (id, reference, method, value) => {
      dispatch(createDetailAction(id, reference, method, value));
    },
  };
};

Detail.propTypes = {
  material: PropTypes.object,
  createNewDetail: PropTypes.func,
  details: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
