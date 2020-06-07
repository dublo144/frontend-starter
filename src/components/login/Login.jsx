import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function LogIn({ hideModal }) {
  const { signIn, isLoading } = useAuth();
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const handleLogin = (evt) => {
    evt.preventDefault();
    signIn(loginCredentials.username, loginCredentials.password);
    hideModal();
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <Grid
      textAlign='center'
      style={{ height: '50vh', width: '50vh' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Welcome back. Sign in below!
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              id='username'
              onChange={onChange}
              value={loginCredentials.username}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              id='password'
              onChange={onChange}
              value={loginCredentials.password}
            />

            <Button
              loading={isLoading}
              onClick={handleLogin}
              color='blue'
              fluid
              size='large'
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New User? <Link to='/signup'>Sign up!</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
