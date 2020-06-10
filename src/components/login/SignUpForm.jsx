import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import {
  signUp,
  useAuthDispatch,
  useAuthState
} from '../../contexts/AuthContext.jsx';

const SignUpForm = ({ hideModal }) => {
  const dispatch = useAuthDispatch();
  const state = useAuthState();

  const initialCredentials = {
    username: '',
    password: '',
    confirm: ''
  };

  const [credentials, setCredentials] = React.useState(initialCredentials);
  const [pwMatch, setPwMatch] = React.useState();

  const onChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.id]: evt.target.value });
  };

  const onBlur = () => {
    if (credentials.password === credentials.confirm) {
      setPwMatch(true);
    } else {
      setPwMatch(false);
    }
  };

  const handleSubmit = () => {
    signUp(credentials.username, credentials.password, dispatch);
    setCredentials(initialCredentials);
    hideModal();
  };

  return (
    <Form size='large'>
      <Form.Field required>
        <label>Username</label>
        <Form.Input
          icon='user'
          iconPosition='left'
          placeholder='Username'
          id='username'
          loading={state.status === 'pending'}
          onChange={onChange}
          value={credentials.username}
        />
      </Form.Field>
      <Form.Field required>
        <label>Password</label>
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          id='password'
          loading={state.status === 'pending'}
          onChange={onChange}
          value={credentials.password}
        />
      </Form.Field>
      <Form.Field required>
        <label>Repeat Password</label>
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          id='confirm'
          loading={state.status === 'pending'}
          onChange={onChange}
          onBlur={onBlur}
          value={credentials.confirm}
          error={pwMatch === false}
        />
      </Form.Field>
      <Button
        primary
        fluid
        loading={state.status === 'pending'}
        onClick={handleSubmit}
        size='large'
        id='signUpBtn'
        disabled={pwMatch === false}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
