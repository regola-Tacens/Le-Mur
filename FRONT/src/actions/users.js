export const storeUSerInputValue = (name, value) => (
  { type: 'STORE_USER_LOGIN_INPUT', name: name, inputValue: value }
);

export const storeUserRegisterInput = (inputName, inputValue) => (
  { type: 'STORE_USER_REGISTER_INPUT', name: inputName, value: inputValue }
);

export const createUser = () => (
  { type: 'CREATE_USER' }
);

export const logUser = (userData) => (
  { type: 'LOG_USER', userData: userData }
);

export const submitUserLogin = () => (
  { type: 'SUBMIT_USER_LOGIN' }
);

export const disconnectUser = () => (
  { type: 'DISCONNECT_USER' }
);
