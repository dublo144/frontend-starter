import React from 'react';

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const CountProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
};

const useCountState = () => {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};

const useCountDispatch = () => {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
};

const useCount = () => {
  return [useCountState(), useCountDispatch()];
};

export { CountProvider, useCount };
