import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Detail from '../Detail/Detail';
import If from '../If/If';
import detailActions from '../../store/actions/detail-actions';
import Auth from '../Auth/auth';

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
              <th className='column-material'>Material</th>
              <th className='column-reference'>Reference</th>
              <th className='column-method'>Method</th>
              <th className='column-value'>Value in MPa√m (S.D.)</th>
              <Auth capability='update'>
                <th className='column-update'>Update</th>
              </Auth>
              <Auth capability='delete'>
                <th className='column-delete'>Delete</th>
              </Auth>

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
