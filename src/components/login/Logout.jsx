import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';

const Logout = ({ hideModal }) => {
  const { isLoading, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    hideModal();
  };

  return (
    <Segment textAlign='center'>
      <Header as='h2' color='blue'>
        We are sad to see you leave - Are you sure you want to sign out?
      </Header>
      <Button primary loading={isLoading} onClick={handleLogout} size='large'>
        Sign out
      </Button>
    </Segment>
  );
};

export default Logout;
