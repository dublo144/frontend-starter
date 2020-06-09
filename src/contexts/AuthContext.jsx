import React from 'react';
import { apiUtils } from '../utils/apiUtils';

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

const signIn = async (username, password, dispatch) => {
  dispatch({ type: 'SIGN_IN' });
  try {
    const options = apiUtils.makeOptions('POST', {
      username: username,
      password: password
    });
    const res = await apiUtils.fetchData('/login', options);
    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: {
        username: res.username,
        jwtToken: res.token,
        roles: res.roles
      }
    });
  } catch (error) {
    dispatch({ type: 'SIGN_IN_FAILED', payload: error });
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch, signIn };
