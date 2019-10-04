import selectedReducer from '../store/reducers/selected-reducer';

describe('Material reducer', () => {
  test('should return initial state', () => {
    expect(selectedReducer(undefined, [])).toEqual([]);
  });

  test('should add selected material to state', () => {
    const createAction = {
      type: 'SELECT_MATERIAL',
      payload: { name: 'test', _id: 2 },
    };
    expect(selectedReducer([{ name: 'original', _id: 1 }], createAction)).toEqual([{ name: 'original', _id: 1 }, { name: 'test', _id: 2 }]);
  });

  test('should remove a deselected material from state', () => {
    const deleteAction = {
      type: 'DESELECT_MATERIAL',
      payload: { name: 'test', _id: 1 },
    };
    expect(selectedReducer([{ name: 'test', _id: 1 }], deleteAction)).toEqual([]);
  });
});
