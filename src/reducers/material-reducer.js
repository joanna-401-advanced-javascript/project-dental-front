export default (state = [], {type, payload}) => {
  switch(type){
    case 'MATERIAL_CREATE':
      return [...state, payload];
    default:
      return state;
  }
};