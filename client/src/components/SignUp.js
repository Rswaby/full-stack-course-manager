/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isEmpty, uniqueId } from 'lodash';
import { Context } from '../context';

function SignUp() {
  const { restClient, actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorList, setErrors] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;
    switch (elementName) {
      case 'firstName':
        setFirstName(elementValue);
        break;
      case 'lastName':
        setLastName(elementValue);
        break;
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
  /**
   *
   * @param {State} value
   * @returns null if values is empty or original value if nut
   */
  const handleEmtyValues = (value) => {
    if (isEmpty(value)) {
      return null;
    }
    return value;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      firstName: handleEmtyValues(firstName),
      lastName: handleEmtyValues(lastName),
      emailAddress,
      password,
    };
    restClient.createUser(newUser)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          actions.signIn(emailAddress, password).then(() => {
            history.push('/');
          });
        }
      });
  };
  const displayValidationErrors = () => {
    const listItems = errorList.map(
      (error, index) => <li key={uniqueId(index)}>{error.message}</li>,
    );
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>{listItems}</ul>
      </div>
    );
  };
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {errorList.length > 0 ? displayValidationErrors() : null}
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={handleChange}
        />
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
        <button className="button" type="submit">Sign Up</button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => history.push('/')}
        >
          Cancel
        </button>
        <p>
          {'Already have a user account? '}
          <Link to="/signin">Click here</Link>
          {' to sign in!'}
        </p>
      </form>
    </div>
  );
}

export default SignUp;
