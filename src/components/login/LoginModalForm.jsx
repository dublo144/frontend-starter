import React from 'react';
import { Segment, Grid, Divider, Header } from 'semantic-ui-react';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';

const LoginModalForm = ({ hideModal }) => {
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column textAlign='center' verticalAlign='middle'>
          <Header>Welcome back. Sign in below!</Header>
          <LoginForm hideModal={hideModal} />
        </Grid.Column>

        <Grid.Column textAlign='center' verticalAlign='middle'>
          <Header>Dont have an account? Create one below!</Header>
          <SignUpForm hideModal={hideModal} />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};

export default LoginModalForm;
