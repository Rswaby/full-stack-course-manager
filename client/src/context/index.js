import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import RestApiClient from '../RestApiClient';
import isObject from '../utils';

export const Context = React.createContext();
const restClient = new RestApiClient();

export const Provider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const cookie = Cookies.get('authenticatedUser');
  const initialState = !isEmpty(cookie) ? JSON.parse(cookie) : null;
  const [authenticatedUser, setUser] = useState(initialState);
  // since authenticatedUser is define in provider
  // scope create functions inside to use it

  const handleSignIn = async (username, password) => {
    const user = await restClient.getUser(username, password);
    if (isObject(user)) {
      setUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  const handleSignOut = async () => {
    setUser(null);
    Cookies.remove('authenticatedUser');
  };

  return (
    <Context.Provider value={{
      restClient,
      authenticatedUser,
      actions: {
        signIn: handleSignIn,
        signOut: handleSignOut,
      },
    }}
    >
      { children }
    </Context.Provider>
  );
};
export const { Consumer } = Context;
