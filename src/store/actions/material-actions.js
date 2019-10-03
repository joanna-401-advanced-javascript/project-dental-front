import cookie from 'react-cookies';

const API = process.env.REACT_APP_API;

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

const fetchMaterialsAction = () => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${cookieToken}`,
    }),
  };

  return fetch(`${API}/api/v1/material`, options)
    .then(((results) => results.json()))
    .then((data) => dispatch(get(data)));
};

export default {
  get,
  createMaterialAction,
  fetchMaterialsAction,
};
