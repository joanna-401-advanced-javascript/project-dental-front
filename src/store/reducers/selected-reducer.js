export default (state = [], action) => {
  switch (action.type) {
    case 'SELECT_MATERIAL':
      return [...state, action.payload];
    case 'DESELECT_MATERIAL':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};
