const initialState = {
  id: 1,
  email: '',
  password: '',
  token: '',
  name: '',
  lastname: '',
  role: '',
  loggedUserName: '',
  logged: false,
  credentials: {
    email: '',
    password: '',
  },
  users: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'STORE_USER_LOGIN_INPUT':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [action.name]: action.inputValue,
        },
      };
    case 'STORE_USER_REGISTER_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'LOG_USER':
      localStorage.setItem('profile', JSON.stringify(action.userData.token));
      return {
        ...state,
        loggedUserName: `${action.userData.result.name} ${action.userData.result.lastname}`,
        credentials: {
          email: '',
          password: '',
        },
        logged: true,
      };
    case 'DISCONNECT_USER':
      localStorage.clear();
      return {
        ...state,
        loggedUserName: '',
        logged: false,
      };
    default:
      return state;
  }
};

export default reducer;
