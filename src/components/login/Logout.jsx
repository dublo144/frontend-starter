import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';

const Logout = ({ hideModal }) => {
  const { isLoading, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    hideModal();
  };

  return (
    <Grid
      textAlign='center'
      style={{ height: '50vh', width: '50vh' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          We are sad to see you leave - Are you sure you want to sign out?
        </Header>
        <Button
          loading={isLoading}
          onClick={handleLogout}
          color='blue'
          fluid
          size='large'
        >
          Sign out
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default Logout;
