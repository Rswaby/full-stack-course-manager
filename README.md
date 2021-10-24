# full-stack-course-manager
A full-stack course management application written in react using react-hooks and express
This app creates new users and new courses. users and course share a relatioship and only users who created a course will be able to update/delete it.

### How to run (rest_api)
```sh
git clone <repoUrl>
cd <repoName>/rest_api
npm run seed (optional: populate db)
npm install
npm start
```
### How to run (client/frontend/UI)
```sh
git clone <repoUrl>
cd <repoName>/client
npm install
npm run seed (optional: populate db)
npm start
```
## Details about the REST API
A simple express app that performs basic crud commands as well as managing authentication and authorization using squelize as an orm.
This app creates new users and new courses. users and course share a relatioship. 
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
## Details about the UI (client)
This app creates new users and new courses. users and course share a relatioship and only users who created a course will be able to update/delete it. it also manages user data for authorization etc. 
This project uses the react.Context api to pass data around to avoid prop drilling and also makes use of react hooks
Example:
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
