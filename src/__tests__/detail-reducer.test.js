import detailReducer from '../store/reducers/detail-reducer';

describe('Detail reducer', () => {
  test('should return initial state', () => {
    expect(detailReducer(undefined, [])).toEqual([]);
  });

  test('should fetch all details', () => {
    const fetchAction = {
      type: 'DETAIL_FETCH',
      payload: [{ reference: 'test' }],
    };
    expect(detailReducer([], fetchAction)).toEqual([{ reference: 'test' }]);
  });

  test('should create a new detail', () => {
    const createAction = {
      type: 'DETAIL_ADD',
      payload: { reference: 'test' },
    };
    expect(detailReducer([{ reference: 'original' }], createAction)).toEqual([{ reference: 'original' }, { reference: 'test' }]);
  });

  test('should update a detail', () => {
    const updateAction = {
      type: 'DETAIL_UPDATE',
      payload: { reference: 'update', _id: 1 },
    };
    expect(detailReducer([{ reference: 'test', _id: 1 }], updateAction)).toEqual([{ reference: 'update', _id: 1 }]);
  });

  test('should delete a detail', () => {
    const deleteAction = {
      type: 'DETAIL_DELETE',
      payload: { reference: 'test', _id: 1 },
    };
    expect(detailReducer([{ reference: 'test', _id: 1 }], deleteAction)).toEqual([]);
  });
});
