/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../context';

export default ({ component: Component, ...rest }) => (
  <Consumer>
    {(context) => (
      <Route
        {...rest}
        render={(props) => (context.authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
          />
        ))}
      />
    )}
  </Consumer>
);
