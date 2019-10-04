const selectMaterialAction = (id) => {
  return ({
    type: 'SELECT_MATERIAL',
    payload: id,
  });
};

const deselectMaterialAction = (id) => {
  return ({
    type: 'DESELECT_MATERIAL',
    payload: id,
  });
};

export default {
  selectMaterialAction,
  deselectMaterialAction,
};
