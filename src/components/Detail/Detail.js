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

  componentDidMount = () => {
    this.props.fetchDetails();
  };

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
    this.setState({ reference: '', method: '', value: '' });
  };

  render() {
    const detailsJSX = this.props.details.filter(
      (detail) => detail.materialId === this.props.material._id,
    );
    // if (Object.keys(this.props.details).length > 0) {
    //   const { id } = this.props.material;
    //   const targetDetails = this.props.details[id];
    //   detailsJSX = targetDetails.map((detail, i) => (
    //     <div key={i}>
    //       <li>Reference: {detail.reference}</li>
    //       <li>Method: {detail.method}</li>
    //       <li>Value: {detail.value}</li>
    //     </div>
    //   ));
    // }

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
    fetchDetails: () => dispatch(detailActions.fetchDetailsAction()),
    // createNewDetail: (id, reference, method, value) => {
    //   dispatch(detailActions.createDetailAction(id, reference, method, value));
    // },
  };
};

Detail.propTypes = {
  material: PropTypes.object,
  createNewDetail: PropTypes.func,
  fetchDetails: PropTypes.func,
  details: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
