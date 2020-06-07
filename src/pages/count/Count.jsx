import React from 'react';
import { CountProvider } from '../../contexts/CountContext.jsx';
import CounterDisplay from '../../components/counter/CounterDisplay.jsx';
import CounterButtons from '../../components/counter/CounterButtons.jsx';

const Count = () => {
  return (
    <CountProvider>
      <CounterDisplay />
      <CounterButtons />
    </CountProvider>
  );
};

export default Count;
