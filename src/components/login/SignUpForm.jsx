import React, { useState, useRef } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useHistory } from 'react-router-dom';
import { apiUtils } from '../../utils/apiUtils';
import { backendUrl } from '../../config/settings';

const SignUpForm = () => {
  const { signIn, isLoading } = useAuth();
  const init = { username: '', password: '', password2: '' };
  const signUpCredentials = useRef(init);
  const [isSamePassword, setIsSamePassword] = useState(false);
  const history = useHistory();

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    const opt = apiUtils.makeOptions('POST', {
      username: signUpCredentials.current.username,
      password: signUpCredentials.current.password
    });
    const res = await fetch(`${backendUrl}/login/create`, opt);
    const json = await res.json();
    if (json.username !== null && json.token !== null) {
      signIn(
        signUpCredentials.current.username,
        signUpCredentials.current.password
      );
      history.push('/');
    } else {
      alert(json.message);
    }
  };

  const onChange = (evt) => {
    signUpCredentials.current[evt.target.id] = evt.target.value;
    comparePassword();
  };

  const comparePassword = () => {
    if (
      signUpCredentials.current.password.length === 0 ||
      signUpCredentials.current.password2.length === 0
    ) {
      setIsSamePassword(false);
    } else {
      setIsSamePassword(
        signUpCredentials.current.password ===
          signUpCredentials.current.password2
      );
    }
  };

  return (
    <Form size='large'>
      <Form.Input
        fluid
        icon='user'
        iconPosition='left'
        placeholder='Username'
        id='username'
        onChange={onChange}
        value={signUpCredentials.username}
        label='Username'
      />
      <Form.Input
        fluid
        icon='lock'
        iconPosition='left'
        placeholder='Password'
        type='password'
        id='password'
        onChange={onChange}
        value={signUpCredentials.password}
        label='Password'
      />
      <Form.Input
        fluid
        icon='lock'
        iconPosition='left'
        placeholder='Password'
        type='password'
        id='password2'
        onChange={onChange}
        value={signUpCredentials.password2}
        label='Repeat Password'
        error={!isSamePassword}
      />
      <Button
        primary
        fluid
        loading={isLoading}
        onClick={handleSignUp}
        size='large'
        id='signUpBtn'
        disabled={!isSamePassword}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
