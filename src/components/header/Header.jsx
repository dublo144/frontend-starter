import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import LoginModal from '../login/LoginModal.jsx';

export default function Header() {
  const {
    user: { isLoggedIn, name, roles, authenticateRole }
  } = useAuth();

  const handleLoginLogOut = () => {
    return isLoggedIn ? (
      <Menu.Item position='right'>
        <Button
          content={name}
          icon='user'
          primary
          style={{ marginRight: '0.5em' }}
        />
        <LoginModal />
      </Menu.Item>
    ) : (
      <>
        <Menu.Item position='right'>
          <Button
            as={Link}
            to='/signup'
            primary
            style={{ marginRight: '0.5em' }}
          >
            Sign Up
          </Button>
          <LoginModal />
        </Menu.Item>
      </>
    );
  };

  return (
    <Menu>
      <Container>
        <Menu.Item as={NavLink} exact to='/' name='home'>
          Home
        </Menu.Item>

        <Menu.Item as={NavLink} exact to='/jokes' name='jokes'>
          Jokes
        </Menu.Item>

        {authenticateRole('admin') && (
          <Menu.Item as={NavLink} exact to='/scrape' name='scrape'>
            Scrape
          </Menu.Item>
        )}

        <Menu.Item as={NavLink} exact to='/content3' name='jokes'>
          Content 3
        </Menu.Item>

        {handleLoginLogOut()}
      </Container>
    </Menu>
  );
}
