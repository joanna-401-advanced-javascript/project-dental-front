// import Auth from '../components/Auth/auth';
//
// describe('Auth Components', () => {
//   test('Auth component children render when authorized', () => {
//
//   });
// });

import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore, shallowWithState } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

describe.skip('Shallow with Store', () => {
  const ReactComponent = () => (<div>dummy component</div>);
  describe('state', () => {
    it('works', () => {
      const expectedState = 'expectedState';
      const mapStateToProps = (state) => ({
        state,
      });
      const ConnectedComponent = connect(mapStateToProps, null)(ReactComponent);
      const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
      expect(component.props().state).toBe(expectedState);
    });
  });

  describe.skip('dispatch', () => {
    it('works', () => {
      const action = {
        type: 'type',
      };
      const mapDispatchToProps = (dispatch) => ({
        dispatchProp() {
          dispatch(action);
        },
      });
      const store = createMockStore();

      const ConnectedComponent = connect(undefined, mapDispatchToProps)(ReactComponent);
      const component = shallowWithStore(<ConnectedComponent />, store);
      component.props().dispatchProp();
      expect(store.isActionDispatched(action)).toBe(true);
    });
  });
});

describe.skip('Shallow with State', () => {
  const ReactComponent = () => (<div>Dummy component</div>);
  it('works', () => {
    const expectedState = 'expectedState';
    const mapStateToProps = (state) => ({
      state,
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithState(<ConnectedComponent />, expectedState);
    expect(component.props().state).toBe(expectedState);
  });
});
