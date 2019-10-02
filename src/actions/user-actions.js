export const changeStateAction = (loggedIn, token, user) => ({
  type: 'USER_STATE_CHANGE',
  payload: {
    loggedIn,
    token,
    user,
  },
});

export const logoutAction = () => ({
  type: 'LOGOUT',
  payload: {
    loggedIn: false,
    token: null,
    user: {},
  },
});
