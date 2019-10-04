import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import selectedActions from '../../store/actions/selected-actions';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleChange = (event, id, name) => {
    const selectedObject = { name, _id: id };
    this.setState({ checked: event.target.checked });
    if (event.target.checked === true) {
      this.props.selectMaterial(selectedObject);
    } else {
      this.props.deselectMaterial(selectedObject);
    }
  };

  render() {
    return (
      <>
        <label>
          Compare:
          <input
            type='checkbox'
            id={this.props.id}
            name={this.props.name}
            checked={this.state.checked}
            onChange={(event) => this.handleChange(event, this.props.id, this.props.name)}
          />
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMaterials: state.selectedMaterials,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMaterial: (data) => dispatch(selectedActions.selectMaterialAction(data)),
    deselectMaterial: (data) => dispatch(selectedActions.deselectMaterialAction(data)),
  };
};

Checkbox.propTypes = {
  selectMaterial: PropTypes.func,
  deselectMaterial: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
