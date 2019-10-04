export default (state = [], action) => {
  switch (action.type) {
    case 'SELECT_MATERIAL':
      return [...state, action.payload];
    case 'DESELECT_MATERIAL':
      return state.filter((material) => material._id !== action.payload._id);
    default:
      return state;
  }
};
