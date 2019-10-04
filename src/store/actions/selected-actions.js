const selectMaterialAction = (payload) => {
  return ({
    type: 'SELECT_MATERIAL',
    payload,
  });
};

const deselectMaterialAction = (payload) => {
  return ({
    type: 'DESELECT_MATERIAL',
    payload,
  });
};

export default {
  selectMaterialAction,
  deselectMaterialAction,
};
