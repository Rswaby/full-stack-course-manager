/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../context';

function UpdateCourse() {
  const { restClient, authenticatedUser } = useContext(Context);
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materialsNeeded, setMaterials] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [errorlist, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    restClient.getCourseById(id)
      .then((data) => {
        setCourse(data);
        setIsLoading(false);
        setTitle(data.title);
        setDescription(data.description);
        setMaterials(data.materialsNeeded || '');
        setEstimatedTime(data.estimatedTime || '');
      });
  }, []);

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
    const updatedCourseInfo = {
      id: parseInt(id, 10),
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id,
    };
    // Only for Practice, Bad Idea for Production code
    const creds = {
      username: authenticatedUser.emailAddress,
      password: authenticatedUser.password,
    };
    restClient.updateCourse(updatedCourseInfo, creds).then((errors) => {
      if (errors.length) {
        setErrors(errors);
      } else {
        history.push(`/courses/${id}`);
      }
    });
  };
  console.log(errorlist);
  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label>Course Title</label>
              <input id="title" name="title" type="text" value={title} onChange={handleChange} />
              <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
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
          <button className="button" type="submit">Update Course</button>
          <button className="button button-secondary" type="button" onClick={() => history.push(`/courses/${id}`)}>Cancel</button>
        </form>
      )
        : (<p>loading..</p>)}
    </div>
  );
}

export default UpdateCourse;
