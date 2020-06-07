import React from 'react';
import LoginModal from '../login/LoginModal.jsx';

const Unauthorized = () => {
  return (
    <>
      <h1>Unauthorized - Please Login</h1>
      <LoginModal />
    </>
  );
};

export default Unauthorized;
