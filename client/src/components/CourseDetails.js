/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-fragments */
import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { uniqueId } from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Context } from '../context';

function CourseDetails() {
  const { restClient, authenticatedUser } = useContext(Context);
  const [course, setCourse] = useState({});
  const [errorList, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    restClient.getCourseById(id)
      .then((data) => {
        setCourse(data);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = () => {
    // Not For Production
    const creds = {
      username: authenticatedUser.emailAddress,
      password: authenticatedUser.password,
    };
    restClient.deleteCourseById(id, creds).then((errors) => {
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
  const renderUpdateAndDelete = () => {
    if (authenticatedUser && authenticatedUser.id === course.User.id) {
      return (
        <Fragment>
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <Link className="button" to="#" onClick={handleDelete}>Delete Course</Link>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Link className="button button-secondary" to="/">Return to List</Link>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <div className="actions--bar">
        <div className="wrap">
          {isLoading ? null : renderUpdateAndDelete()}
        </div>
      </div>
      {isLoading ? (<p>loading..</p>) : (
        <div className="wrap">
          {errorList.length > 0 ? displayValidationErrors() : null}
          <h2>Course Details</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                {`By ${course.User.firstName} ${course.User.lastName}`}
              </p>
              <ReactMarkdown>
                {course.description}
              </ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime ? course.estimatedTime : 'TBD'}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default CourseDetails;
