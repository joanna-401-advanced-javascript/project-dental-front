/* eslint-disable no-case-declarations */

export default (state = [], action) => {
  switch (action.type) {
    case 'DETAIL_FETCH':
      return action.payload;
    case 'DETAIL_ADD':
      return [...state, action.payload];
    case 'DETAIL_DELETE':
      return state.filter((detail) => detail._id !== action.payload._id);
    default:
      return state;
  }
};
