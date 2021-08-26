/* eslint-disable react/jsx-fragments */
import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Context } from '../context';

function CourseDetails() {
  const { restClient } = useContext(Context);
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    restClient.getCourseById(id)
      .then((data) => {
        setCourse(data);
        setIsLoading(false);
      });
  }, []);

  const renderMaterials = () => {
    const { materialsNeeded } = course;
    if (materialsNeeded) {
      const materialsWithoutSym = materialsNeeded.replaceAll('*', '');
      const listItems = materialsWithoutSym.split('\n')
        .map((material, index) => {
          if (!isEmpty(material)) {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{material}</li>;
          }
          return null;
        });
      return listItems;
    }
    return null;
  };
  return (
    <Fragment>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <Link className="button" to="/delete">Delete Course</Link>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      {isLoading ? (<p>loading..</p>) : (
        <div className="wrap">
          <h2>Course Details</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                {`By ${course.User.firstName} ${course.User.lastName}`}
              </p>
              <p>
                {course.description}
              </p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime ? course.estimatedTime : 'TBD'}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {renderMaterials()}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default CourseDetails;
