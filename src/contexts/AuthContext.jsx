import React from 'react';
import { apiUtils } from '../utils/apiUtils';
import { getUserAndRoles } from '../utils/JwtTokenParser';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

const initialState = {
  roles: [],
  jwtToken: '',
  username: '',
  isLoggedIn: false,
  status: status.IDLE,
  error: null
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    // Sign in
    case 'SIGN_IN': {
      return { ...state, status: status.PENDING };
    }
    case 'SIGN_IN_SUCCESS': {
      localStorage.setItem('jwtToken', payload.jwtToken);
      return {
        ...state,
        status: status.RESOLVED,
        username: payload.username,
        jwtToken: payload.jwtToken,
        roles: payload.roles,
        isLoggedIn: true
      };
    }
    case 'SIGN_IN_FAILED':
      return { status: status.REJECTED, error: payload.error };

    // Sign up
    case 'SIGN_UP':
      return { ...state, status: status.PENDING };
    case 'SIGN_UP_SUCCESS':
      return { ...state, status: status.RESOLVED };
    case 'SIGN_UP_FAILED':
      return { ...state, status: status.REJECTED, error: payload.error };

    // Sign out
    case 'SIGN_OUT': {
      localStorage.removeItem('jwtToken');
      return {
        initialState
      };
    }
    default: {
      throw new Error(`Unhandled type: ${type}`);
    }
  }
};

const signIn = async (_username, password, dispatch) => {
  dispatch({ type: 'SIGN_IN' });
  try {
    const options = apiUtils.makeOptions('POST', {
      username: _username,
      password: password
    });
    const res = await apiUtils.fetchData('/login', options);
    const { username, roles } = getUserAndRoles(res.token);
    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: {
        username: username,
        jwtToken: res.token,
        roles: roles
      }
    });
  } catch (error) {
    dispatch({ type: 'SIGN_IN_FAILED', payload: error });
  }
};

const signUp = async (_username, password, dispatch) => {
  dispatch({ type: 'SIGN_UP' });
  try {
    const opts = apiUtils.makeOptions('POST', {
      username: _username,
      password: password
    });
    await apiUtils.fetchData('/login/create', opts);
    dispatch({ type: 'SIGN_UP_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'SIGN_UP_FAILED', payload: error });
  }
};

const init = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const { username, roles } = getUserAndRoles(token);
    return {
      ...initialState,
      roles: roles,
      jwtToken: token,
      username: username,
      isLoggedIn: true
    };
  } else {
    return initialState;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState, init);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch, signIn, signUp };
