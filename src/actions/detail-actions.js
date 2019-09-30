export const createDetailAction = (id, reference, method, value) => ({
  type: 'DETAIL_CREATE',
  payload: {
    materialId: id,
    id: Math.random(),
    reference,
    method,
    value,
    timeStamp: Math.floor(Date.now() / 1000),
  }
});
