import React from 'react';
import Header from './components/header';
import Routes from './config/Routes.jsx';
import { Container } from 'semantic-ui-react';
import ProvideAuth from './hooks/useAuth.jsx';
import { StateProvider } from './contexts/StateContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <StateProvider>
      <ProvideAuth>
        <AuthProvider>
          <Header />
          <Container>
            <Routes />
          </Container>
        </AuthProvider>
      </ProvideAuth>
    </StateProvider>
  );
}

export default App;
