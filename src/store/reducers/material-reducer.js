export default (state = [], action) => {
  switch (action.type) {
    case 'MATERIAL_FETCH':
      return action.payload;
    case 'MATERIAL_ADD':
      return [...state, action.payload];
    case 'MATERIAL_UPDATE':
      return state.map((material) => {
        if (material._id === action.payload._id) {
          material.name = action.payload.name;
        }
        return material;
      });
    default:
      return state;
  }
};
