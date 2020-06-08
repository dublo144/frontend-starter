import React from 'react';
import { useCount } from '../../contexts/CountContext.jsx';

const CounterButtons = () => {
  const [, dispatch] = useCount();
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment Count
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement Count
      </button>
      <input
        type='number'
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch({ type: 'SET_COUNT', payload: count })}>
        Set Count
      </button>
    </div>
  );
};

export default CounterButtons;
