/* eslint-disable no-case-declarations */

export default (state = [], action) => {
  switch (action.type) {
    // case 'MATERIAL_CREATE':
    //   return { ...state, [payload.id]: [] };
    case 'DETAIL_FETCH':
      return action.payload;
    // case 'DETAIL_CREATE':
    //   const targetArray = state[payload.materialId];
    //   const updatedArray = [...targetArray, payload];
    //   return { ...state, [payload.materialId]: updatedArray };
    default:
      return state;
  }
};
