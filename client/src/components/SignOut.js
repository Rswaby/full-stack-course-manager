import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context';

function SignOut() {
  const { actions } = useContext(Context);
  useEffect(() => actions.signOut());
  return (
    <Redirect to="/" />
  );
}
export default SignOut;
