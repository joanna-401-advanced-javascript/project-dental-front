import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Actions
import PropTypes from 'prop-types';
import materialActions from '../../store/actions/material-actions';

class MaterialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMaterial({ name: this.state.name });
    this.setState({ name: '' });
  };

  render() {
    return (
      <>
        <div className='material-add'>
          <h3>Add new material</h3>
          <form onSubmit={this.handleSubmit}>
            <label> Material name
              <input
                name='material'
                type='text'
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <button type='submit'>Add to database</button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  materials: state.materials,
});

const mapDispatchToProps = (dispatch) => ({
  addMaterial: (name) => dispatch(materialActions.addMaterialAction(name)),
});

MaterialForm.propTypes = {
  addMaterial: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm);
