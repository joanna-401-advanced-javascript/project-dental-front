import cookie from 'react-cookies';

const API = process.env.REACT_APP_API;

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
    .then((results) => results.json())
    .then((data) => dispatch(get(data)));
};

const post = (payload) => {
  return {
    type: 'MATERIAL_ADD',
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

const put = (payload) => {
  return {
    type: 'MATERIAL_UPDATE',
    payload,
  };
};

const updateMaterialAction = (data) => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const updateData = { name: data.name };
  const options = {
    method: 'PUT',
    body: JSON.stringify(updateData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${cookieToken}`,
    },
  };

  return fetch(`${API}/api/v1/material/${data.id}`, options)
    .then((results) => results.json())
    .then((dataFromApi) => dispatch(put(dataFromApi)));
};

const deleteThis = (payload) => {
  return {
    type: 'MATERIAL_DELETE',
    payload,
  };
};

const deleteMaterialAction = (data) => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${cookieToken}`,
    }),
  };

  return fetch(`${API}/api/v1/material/${data._id}`, options)
    .then(() => dispatch(deleteThis(data)));
};

export default {
  fetchMaterialsAction,
  addMaterialAction,
  updateMaterialAction,
  deleteMaterialAction,
};
