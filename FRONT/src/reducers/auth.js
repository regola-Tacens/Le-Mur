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
  users: '',
  loggedUserInfos: {
    id: null,
    name: '',
    lastname: '',
  }
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
    case 'POPULATE_LOGGEDINFOS_FROM_LOCALSTORAGE':
      return {
        ...state,
        loggedUserName: `${action.name} ${action.lastname}`,
        name: action.name,
        lastname: action.lastname,
        loggedUserInfos: {
          name: action.name,
          lastname: action.lastname,
          id: action.id
        },
      };
    case 'LOG_USER':
      localStorage.setItem('profile', JSON.stringify(action.userData.token));
      localStorage.setItem('name', action.userData.result.name );
      localStorage.setItem('lastname', action.userData.result.lastname );
      localStorage.setItem('userId', action.userData.result.id );
      return {
        ...state,
        loggedUserName: `${action.userData.result.name} ${action.userData.result.lastname}`,
        name: action.userData.result.name,
        lastname: action.userData.result.lastname,
        loggedUserInfos: {
          name: action.userData.result.name,
          lastname: action.userData.result.lastname,
          id: action.userData.result.id
        },
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
    case 'STORE_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'UPDATE_USERS':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
