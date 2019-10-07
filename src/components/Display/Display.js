import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Detail from '../Detail/Detail';
import If from '../If/If';
import detailActions from '../../store/actions/detail-actions';

class Display extends React.Component {
  componentDidMount = () => {
    this.props.fetchDetails();
  };

  render() {
    return (
      <>
        <div className='display-display'>

          <If condition={this.props.selectedMaterials.length > 0}>
            <h2>Details</h2>
            <table>
              <thead>
              <th>Material</th>
              <th>Reference</th>
              <th>Method</th>
              <th>Value in MPa</th>
              <th>Update / Delete</th>
              </thead>
              <tbody>
              {
                this.props.selectedMaterials.map((selected, i) => (
                  <Detail material={selected} key={i}/>
                ))
              }
              </tbody>
            </table>
          </If>
        </div>
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
