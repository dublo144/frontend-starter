import React from 'react';
import { useCount } from '../../contexts/CountContext.jsx';

const CounterDisplay = () => {
  const [state] = useCount();
  return <div>{`The current count is ${state.count}`}</div>;
};

export default CounterDisplay;
