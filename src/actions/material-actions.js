export const createMaterialAction = (name) => ({
  type: 'MATERIAL_CREATE',
  payload: {
    id: Math.random(),
    name,
    timeStamp: Math.floor(Date.now() / 1000),
  },
});

export const another = (name) => {
  return ({
    type: 'MATERIAL_CREATE',
    payload: {
      id: Math.random(),
      name,
      timeStamp: Math.floor(Date.now() / 1000),
    },
  });
};
