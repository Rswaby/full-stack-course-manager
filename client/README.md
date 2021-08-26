# Client (React FrontEnt)
A simple Fron ent app that performs basic operations on Course management. This app creates new users and new courses. users and course share a relatioship and only users who created a course will be able to update/delete it.
course data format passed between UI and Backend:

```json
{
        "id": 1,
        "title": "New Course Updated Again Hello",
        "description": "My course description. And again.",
        "estimatedTime": "12 hours",
        "User": {
            "id": 1,
            "firstName": "Joe",
            "lastName": "Smith",
            "emailAddress": "joe@smith.com"
        }
    }
```

### How to run
```sh
git clone <repo>
cd <repoName>/client
npm install
npm start
```
After development server is up and running sign up and start playing around. 

## Components
### Context
This project uses the react.Context api to pass data around to avoid prop drilling. 
```/src/context/index.js```
Code snip from the context file:
```JavaScript
   import React, { useState } from 'react';
   export const Context = React.createContext();
   ...
   // return all the infomation we'll need example user info and rest interface to connect to db
   return (
    <Context.Provider value={{
      restClient,
      authenticatedUser,
      actions: {
        signIn: handleSignIn,
        signOut: handleSignOut,
      },
    }}
    >
      { children }
    </Context.Provider>
  );
};
```
### Hooks
This app also makes use of react hooks example:
```JavaScript
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
...
import { Context } from '../context';
...
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
```