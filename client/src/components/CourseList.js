import React, { useContext, useEffect } from 'react';
import { Context } from '../context';

function CourseList() {
  const { restClient } = useContext(Context);
  useEffect(() => {
    restClient.getAllCourses()
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className="wrap main--grid">
      <div>List All Courses Here</div>
    </div>
  );
}

export default CourseList;
