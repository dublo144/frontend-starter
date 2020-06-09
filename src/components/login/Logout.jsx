import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useAuthDispatch } from '../../contexts/AuthContext.jsx';

const Logout = ({ hideModal }) => {
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: 'SIGN_OUT' });
    hideModal();
  };

  return (
    <Segment textAlign='center'>
      <Header as='h2' color='blue'>
        We are sad to see you leave - Are you sure you want to sign out?
      </Header>
      <Button primary onClick={handleLogout} size='large'>
        Sign out
      </Button>
    </Segment>
  );
};

export default Logout;
