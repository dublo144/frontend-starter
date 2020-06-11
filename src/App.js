import React from 'react';
import Header from './components/header';
import Routes from './config/Routes.jsx';
import { Container } from 'semantic-ui-react';
import { StateProvider } from './contexts/StateContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <StateProvider>
      <AuthProvider>
        <Header />
        <Container>
          <Routes />
        </Container>
      </AuthProvider>
    </StateProvider>
  );
}

export default App;
