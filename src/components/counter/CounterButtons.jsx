import React from 'react';
import { useCount } from '../../contexts/CountContext.jsx';

const CounterButtons = () => {
  const [, dispatch] = useCount();
  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment Count
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement Count
      </button>
    </div>
  );
};

export default CounterButtons;
