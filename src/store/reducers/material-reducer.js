export default (state = [], action) => {
  switch (action.type) {
    case 'MATERIAL_CREATE':
      return [...state, action.payload];
    case 'MATERIAL_FETCH':
      return action.payload;
    default:
      return state;
  }
};
