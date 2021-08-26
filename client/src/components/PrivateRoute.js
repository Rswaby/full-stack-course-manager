/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Consumer } from '../context';

const PrivateRoute = ({ component: Component, ...rest }) => (
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
// const propTypeValidations = {
//   component: PropTypes.objectOf(PropTypes.object()).isRequired,
//   location: PropTypes.objectOf(PropTypes.object()).isRequired,
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.objectOf(PropTypes.object()).isRequired,
//   location: PropTypes.objectOf(PropTypes.object()).isRequired,
// };
// PropTypes.checkPropTypes(propTypeValidations, ,'prop', 'PrivateRoute');
export default PrivateRoute;
