import React from 'react';
import Header from './components/header';
import Routes from './components/routes/';
import { Container } from 'semantic-ui-react';
import ProvideAuth from './hooks/useAuth.jsx';
import { StateProvider } from './contexts/StateContext.jsx';

function App() {
  return (
    <StateProvider>
      <ProvideAuth>
        <Header />
        <Container>
          <Routes />
        </Container>
      </ProvideAuth>
    </StateProvider>
  );
}

export default App;
