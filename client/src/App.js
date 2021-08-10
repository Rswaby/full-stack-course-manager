/* eslint-disable no-console */
import React, { useEffect } from 'react';
import RestApiClient from './RestApiClient';

const api = new RestApiClient();
function App() {
  useEffect(() => {
    console.log('testing cors with useEffect');
    api.get('courses/')
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="App">
      <div>frontend</div>
    </div>
  );
}

export default App;
