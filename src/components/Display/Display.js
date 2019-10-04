import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Detail from '../Detail/Detail';

class Display extends React.Component {
  render() {
    return (
      <>

        {
          this.props.selectedMaterials.map((selected, i) => (
            <>
              <p>THIS WORKS</p>
              <Detail material={selected} key={i}/>
            </>
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

Display.propTypes = {
  selectedMaterials: PropTypes.array,
};

export default connect(mapStateToProps, null)(Display);
