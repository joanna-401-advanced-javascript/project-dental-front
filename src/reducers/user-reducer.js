const initialState = {
  loggedIn: false,
  token: null,
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case 'USER_STATE_CHANGE':
      return state = payload;
    case 'LOGOUT':
      return state = initialState;
    default:
      return state;
  }
};
