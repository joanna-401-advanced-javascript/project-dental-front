export default (state = {}, {type, payload}) => {
  switch(type){
    case 'MATERIAL_CREATE':
      return {...state, [payload.id]: [] };
    case 'DETAIL_CREATE':
      const targetArray = state[payload.materialId];
      const updatedArray = [...targetArray, payload];
      return {...state, [payload.materialId]: updatedArray};
    default:
      return state;
  }
};
