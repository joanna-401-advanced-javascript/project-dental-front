// const API = process.env.REACT_APP_API;

const createMaterialAction = (name) => ({
  type: 'MATERIAL_CREATE',
  payload: {
    id: Math.random(),
    name,
    timeStamp: Math.floor(Date.now() / 1000),
  },
});

const get = (payload) => {
  return {
    type: 'MATERIAL_FETCH',
    payload,
  };
};

// const fetchMaterialsAction = () => (dispatch) => {
//   return fetch(`${API}/api/v1/material`)
//     .then((results => results.json()))
//     .then((data) => dispatch(get(data)));
// };

export default {
  get,
  createMaterialAction,
  // fetchMaterialsAction,
};
