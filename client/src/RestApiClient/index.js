const SUCCESS = 200;
const SUCCESS_CREATE = 201;
const SUCCESS_UPDATE = 204;
const UNAUTHORIZED = 401;
const INSUFFICIENT_PERMISSION = 403;
const BADREQUEST = 400;
// TODO: convert class to singleton
class RestApiClient {
  /**
   *
   * @param {String}  endpoint The endpoint to the resource on server
   * @param {String}  method  GET | POST | PUT | DELETE
   * @param {Object}  body request body
   * @param {Boolean} auth  determinds if resource requires authenitcation,
   * @param {Object}  creds  username and password
   * @returns promise
   */
  // eslint-disable-next-line class-methods-use-this
  makeApiCall(endpoint, method = 'GET', body = null, auth = false, creds = null) {
    const requestBuilder = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    if (body !== null) {
      requestBuilder.body = JSON.stringify(body);
    }

    if (auth) {
      // TODO: find and alternative to btoa
      const encodedCredentials = btoa(`${creds.username}:${creds.password}`);
      requestBuilder.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    // eslint-disable-next-line no-console
    console.log(`[RestApiClient]:: sending ${method} request to ${endpoint}`);
    return fetch(endpoint, requestBuilder);
  }
  /**
   * This is used to authenticate a user by making a call
   * to the rest api and checking if user is preset
   * @param {string} username user email
   * @param {string} password user password
   * @returns {Object} User
   */

  async getUser(username, password) {
    const response = await this.makeApiCall('/users', 'GET', null, true, { username, password });
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    // eslint-disable-next-line no-else-return
    } else if (response.status === UNAUTHORIZED) {
      return null;
    } else throw new Error();
  }

  /**
   * This Method is used to create a user by making a
   * call to the rest api with new user obj
   * @param {Object} user
   * @returns {} || Error
   */
  async createUser(user) {
    const response = await this.makeApiCall('/users', 'POST', user);
    if (response.status === SUCCESS || response.status === SUCCESS_CREATE) {
      return {};
    // eslint-disable-next-line no-else-return
    } else if (response.status === BADREQUEST) {
      return response.json().then((data) => data);
    } else throw new Error();
  }
  /**
   * Makes a get request to get all course available in on the server
   * @returns List<Courses>
   */

  async getAllCourses() {
    const response = await this.makeApiCall('/courses');
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    // eslint-disable-next-line no-else-return
    } else if (response.status === BADREQUEST) {
      return response.json().then((data) => data.errors);
    } else throw new Error();
  }
  /**
   * Get a course from the server with id = :id
   * @param {Integer} id : Course Id
   * @returns {Object} Course
   */

  async getCourseById(id) {
    const response = await this.makeApiCall(`/courses/${id}`);
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    } if (response.status === BADREQUEST) {
      return response.json().then((data) => data.errors);
    }
    throw new Error();
  }
  /**
   * Makes a call to localhost server to update an existing course
   * @param {Object} course
   * @param {Object} creds
   * @returns {} || errors (if request was incorrect or missing permission)
   */

  async updateCourse(course, creds) {
    const response = await this.makeApiCall(`/courses/${course.id}`, 'PUT', course, true, creds);
    if (response.status === SUCCESS_UPDATE || response.status === SUCCESS) {
      return {};
    } if (response.status === BADREQUEST) {
      return response.json().then((data) => data);
    } if (response.status === INSUFFICIENT_PERMISSION) {
      return response.json().then((data) => {
        const errors = [];
        errors.push(data);
        return errors;
      });
    }
    return null;
  }

  /**
  * create a new course with shape:
  * {
  *  title: STRING | required
  *  description: STRING | required
  *  estimatedTime: STRING | optional
  *  materialsNeeded: STRING | optional
  *  userId: INTEGER | required
  * }
  * @param {Object} course
  * @param {Object} creds
  * @returns
  */
  async CreateCourse(course, creds) {
    const response = await this.makeApiCall('/courses', 'POST', course, true, creds);
    if (response.status === SUCCESS_CREATE || response.status === SUCCESS) {
      return {};
    } if (response.status === BADREQUEST) {
      return response.json().then((data) => data);
    } if (response.status === INSUFFICIENT_PERMISSION || response.status === UNAUTHORIZED) {
      return response.json().then((data) => {
        const errors = [];
        errors.push(data);
        return errors;
      });
    }
    return null;
  }
  /**
   * Delete a course with id = :id
   * @param {Integer} id
   * @param {object} creds
   * @returns
   */

  async deleteCourseById(id, creds) {
    const response = await this.makeApiCall(`/courses/${id}`, 'DELETE', null, true, creds);
    if (response.status === SUCCESS_UPDATE || response.status === SUCCESS) {
      return {};
    } if (response.status === BADREQUEST) {
      return response.json().then((data) => data);
    } if (response.status === INSUFFICIENT_PERMISSION || response.status === UNAUTHORIZED) {
      return response.json().then((data) => {
        const errors = [];
        errors.push(data);
        return errors;
      });
    }
    return null;
  }
}
export default RestApiClient;
