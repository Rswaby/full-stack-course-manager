/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../context';

function SignIn() {
  const { actions } = useContext(Context);
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorList, setErrors] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;
    switch (elementName) {
      case 'emailAddress':
        setEmail(elementValue);
        break;
      case 'password':
        setPassword(elementValue);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    actions.signIn(emailAddress, password).then((errors) => {
      if (errors.length) {
        setErrors(errors);
      } else {
        history.push('/');
      }
    });
  };
  const displayValidationErrors = () => {
    const listItems = errorList.map((error, index) => <li key={index}>{error.message}</li>);
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>{listItems}</ul>
      </div>
    );
  };
  return (
    <div className="form--centered">
      <h2>Sign-in</h2>
      {errorList.length > 0 ? displayValidationErrors() : null}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button className="button" type="submit">Sign In</button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => history.push('/')}
        >
          Cancel
        </button>
        <p>
          {'Don\'t have a user account? '}
          <Link to="/signup">Click here</Link>
          {' to sign up!'}
        </p>
      </form>
    </div>
  );
}

export default SignIn;
