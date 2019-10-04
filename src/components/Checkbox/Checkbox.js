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

  handleChange = (event, id) => {
    this.setState({ checked: event.target.checked });
    if (event.target.checked === true) {
      this.props.selectMaterial(id);
    } else {
      this.props.deselectMaterial(id);
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
            checked={this.state.checked}
            onChange={(event) => this.handleChange(event, this.props.id)}
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
    selectMaterial: (id) => dispatch(selectedActions.selectMaterialAction(id)),
    deselectMaterial: (id) => dispatch(selectedActions.deselectMaterialAction(id)),
  };
};

Checkbox.propTypes = {
  selectMaterial: PropTypes.func,
  deselectMaterial: PropTypes.func,
  id: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
