/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import NewCourse from './components/NewCourse';
import CourseList from './components/CourseList';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={CourseList} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signout" component={SignOut} />
          <Route path="/courses/create" component={NewCourse} />
          <Route path="/courses/:id" component={CourseDetails} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
