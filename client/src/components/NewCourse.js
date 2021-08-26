/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { Context } from '../context';

function NewCourse() {
  const { restClient, authenticatedUser } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materialsNeeded, setMaterials] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [errorList, setErrors] = useState([]);
  const history = useHistory();

  const {
    id,
    firstName,
    lastName,
    emailAddress,
    password,
  } = authenticatedUser;

  const handleChange = (event) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;
    switch (elementName) {
      case 'title':
        setTitle(elementValue);
        break;
      case 'description':
        setDescription(elementValue);
        break;
      case 'estimatedTime':
        setEstimatedTime(elementValue);
        break;
      case 'materialsNeeded':
        setMaterials(elementValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: id,
    };
    // // Only for Practice, Bad Idea for Production code
    const creds = {
      username: emailAddress,
      password,
    };
    restClient.CreateCourse(newCourse, creds).then((errors) => {
      if (errors.length) {
        setErrors(errors);
      } else {
        history.push('/');
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
    <div className="wrap">
      <h2>create New Course Here</h2>
      {errorList.length > 0 ? displayValidationErrors() : null}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label>Course Title</label>
            <input id="title" name="title" type="text" value={title} onChange={handleChange} />
            <p>{`By ${firstName} ${lastName}`}</p>
            <label>Course Description</label>
            <textarea id="description" name="description" value={description} onChange={handleChange} />
          </div>
          <div>
            <label>Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={handleChange} />
            <label>Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={handleChange} />
          </div>
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" type="button" onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default NewCourse;
