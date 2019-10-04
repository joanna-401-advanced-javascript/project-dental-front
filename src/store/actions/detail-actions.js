import cookie from 'react-cookies';

const API = process.env.REACT_APP_API;

const get = (payload) => {
  return {
    type: 'DETAIL_FETCH',
    payload,
  };
};

const fetchDetailsAction = () => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${cookieToken}`,
    }),
  };

  return fetch(`${API}/api/v1/detail`, options)
    .then((results) => results.json())
    .then((data) => dispatch(get(data)));
};

const post = (payload) => {
  return {
    type: 'DETAIL_ADD',
    payload,
  };
};

const addDetailAction = (data) => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${cookieToken}`,
    },
  };

  return fetch(`${API}/api/v1/detail`, options)
    .then((results) => results.json())
    .then((dataFromApi) => dispatch(post(dataFromApi)));
};


export default {
  addDetailAction,
  fetchDetailsAction,
};
