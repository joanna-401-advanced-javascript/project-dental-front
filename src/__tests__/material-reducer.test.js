import materialReducer from '../reducers/material-reducer';
import * as actions from '../actions/material-actions';

describe('Material reducer', () => {
  test('should return initial state', () => {
    expect(materialReducer(undefined, [])).toEqual([]);
  });

  test('should create new material', () => {
    const createAction = {
      type: 'MATERIAL_CREATE',
      payload: {name: 'test'},
    };
    expect(materialReducer([], createAction)).toEqual([{name: 'test'}]);
  });
});
