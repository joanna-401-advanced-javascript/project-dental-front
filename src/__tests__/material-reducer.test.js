import materialReducer from '../store/reducers/material-reducer';

describe('Material reducer', () => {
  test('should return initial state', () => {
    expect(materialReducer(undefined, [])).toEqual([]);
  });

  test('should fetch all material', () => {
    const fetchAction = {
      type: 'MATERIAL_FETCH',
      payload: [{ name: 'test' }],
    };
    expect(materialReducer([], fetchAction)).toEqual([{ name: 'test' }]);
  });

  test('should create new material', () => {
    const createAction = {
      type: 'MATERIAL_ADD',
      payload: { name: 'test' },
    };
    expect(materialReducer([{ name: 'original' }], createAction)).toEqual([{ name: 'original' }, { name: 'test' }]);
  });

  test('should update a material', () => {
    const updateAction = {
      type: 'MATERIAL_UPDATE',
      payload: { name: 'update', _id: 1 },
    };
    expect(materialReducer([{ name: 'test', _id: 1 }], updateAction)).toEqual([{ name: 'update', _id: 1 }]);
  });
});
