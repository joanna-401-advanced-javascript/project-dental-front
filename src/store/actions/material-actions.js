import cookie from 'react-cookies';

const API = process.env.REACT_APP_API;

const fetchMaterialsAction = () => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${cookieToken}`,
    }),
  };

  return fetch(`${API}/api/v1/material`, options)
    .then((results) => results.json())
    .then((data) => dispatch(get(data)));
};

const get = (payload) => {
  return {
    type: 'MATERIAL_FETCH',
    payload,
  };
};

const addMaterialAction = (name) => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'POST',
    body: JSON.stringify(name),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${cookieToken}`,
    },
  };

  return fetch(`${API}/api/v1/material`, options)
    .then((results) => results.json())
    .then((data) => dispatch(post(data)));
};

const post = (payload) => {
  return {
    type: 'MATERIAL_ADD',
    payload,
  }
};

export default {
  fetchMaterialsAction,
  addMaterialAction,
};
