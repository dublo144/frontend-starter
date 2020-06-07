import React from 'react';
import ToggleContent from '../utils/ToggleContent.jsx';
import Modal from '../utils/Modal.jsx';
import LogIn from './Login.jsx';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import Logout from './Logout.jsx';

const LoginModal = () => {
  const {
    user: { isLoggedIn }
  } = useAuth();

  // Toggler
  const loginBtn = (show) => {
    const btnTxt = isLoggedIn ? 'Logout' : 'Login';
    return (
      <Button style={{ marginRight: '0.5em' }} onClick={show}>
        {btnTxt}
      </Button>
    );
  };

  // Content
  const modalContent = (hide) => {
    return (
      <Modal hideModal={hide}>
        {isLoggedIn ? <Logout hideModal={hide} /> : <LogIn hideModal={hide} />}
      </Modal>
    );
  };

  return (
    <ToggleContent
      toggler={(show) => loginBtn(show)}
      content={(hide) => modalContent(hide)}
    />
  );
};

export default LoginModal;
