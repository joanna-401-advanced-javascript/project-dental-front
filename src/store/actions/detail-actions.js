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

// const createDetailAction = (id, reference, method, value) => ({
//   type: 'DETAIL_CREATE',
//   payload: {
//     materialId: id,
//     id: Math.random(),
//     reference,
//     method,
//     value,
//     timeStamp: Math.floor(Date.now() / 1000),
//   },
// });


export default {
  // createDetailAction,
  fetchDetailsAction,
};
