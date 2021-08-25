import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { Context } from '../context';

function CourseList() {
  const { restClient } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [addNewCourseId] = useState(uniqueId('newCourse'));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    restClient.getAllCourses()
      .then((data) => {
        setCourses(data);
        setIsLoading(false);
      });
  }, []);
  const displayCourse = () => {
    let coursedata = [];
    coursedata = courses.map((course) => (
      <Link key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    ));
    coursedata.push(
      <Link key={addNewCourseId} className="course--module course--add--module" to="/courses/create">
        ＋ New Course
      </Link>,
    );
    return coursedata;
  };
  console.log(courses);
  console.log(isLoading);
  return (
    <div className="wrap main--grid">
      { !isLoading ? (displayCourse()) : (<p>loading..</p>)}
    </div>
  );
}

export default CourseList;
