/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewCourse from './components/NewCourse';
import CourseList from './components/CourseList';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';

import RestApiClient from './RestApiClient';

const api = new RestApiClient();
function App() {
  useEffect(() => {
    console.log('testing cors with useEffect');
    api.get('courses/')
      .then((data) => console.log(data));
  }, []);
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (<CourseList />)} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newcourse" component={NewCourse} />
          <Route path="/updatecourse" component={UpdateCourse} />
          <Route path="/coursedetails" component={CourseDetails} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
