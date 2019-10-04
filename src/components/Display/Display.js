import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Detail from '../Detail/Detail';
import detailActions from '../../store/actions/detail-actions';

class Display extends React.Component {
  componentDidMount = () => {
    this.props.fetchDetails();
  };

  render() {
    return (
      <>

        {
          this.props.selectedMaterials.map((selected, i) => (
            <Detail material={selected} key={i}/>
          ))
        }

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMaterials: state.selectedMaterials,
  details: state.details,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: () => dispatch(detailActions.fetchDetailsAction()),
  };
};

Display.propTypes = {
  selectedMaterials: PropTypes.array,
  fetchDetails: PropTypes.func,
  details: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
