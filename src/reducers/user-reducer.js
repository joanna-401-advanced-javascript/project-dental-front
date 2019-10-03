/* eslint-disable no-param-reassign */

const initialState = {
  loggedIn: false,
  token: null,
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_STATE_CHANGE':
      state = payload;
      return state;
    case 'LOGOUT':
      state = initialState;
      return state;
    default:
      return state;
  }
};
