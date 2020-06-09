import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, authenticatedRoles, ...rest }) => {
  // const {
  //   user: { isLoggedIn, roles }
  // } = useAuth();
  const { isLoggedIn, roles } = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn && roles.some((r) => authenticatedRoles.indexOf(r) >= 0) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
