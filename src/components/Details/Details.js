import React from 'react';
import { connect } from 'react-redux';

// Actions
import { createDetailAction } from "../../actions/detail-actions";

class Detail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reference: '',
      method: '',
      value: '',
    };
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createNewDetail(
      this.props.material.id,
      this.state.reference,
      this.state.method,
      this.state.value
      )
  };

  render(){
    return (
      <>
        <h4>Details</h4>
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

const mapDispatchToProps = dispatch => {
  return {
    createNewDetail: (id, reference, method, value) => {
      dispatch(createDetailAction(id, reference, method, value));
    }
  };
};

export default connect(null, mapDispatchToProps)(Detail);