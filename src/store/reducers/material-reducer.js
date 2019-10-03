export default (state = [], action) => {
  switch (action.type) {
    case 'MATERIAL_FETCH':
      return action.payload;
    case 'MATERIAL_ADD':
      return [...state, action.payload];
    default:
      return state;
  }
};
