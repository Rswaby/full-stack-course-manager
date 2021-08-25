const SUCCESS = 200;
const SUCCESS_CREATE = 201;
const UNAUTHORIZED = 401;
const BADREQUEST = 400;
// TODO: convert class to singleton
class RestApiClient {
  /**
   *
   * @param {String}  endpoint The endpoint to the resource on server
   * @param {String}  _method  GET | POST | PUT | DELETE
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
    console.log(`[RestApiClient]:: sending ${method} request to ${endpoint}`);
    return fetch(endpoint, requestBuilder);
  }
  /**
   *
   * @param {string} username user email
   * @param {string} password user password
   * @returns User
   */

  async getUser(username, password) {
    const response = await this.makeApiCall('/users', 'GET', null, true, { username, password });
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    // eslint-disable-next-line no-else-return
    } else if (response.status === UNAUTHORIZED) {
      console.warn('[RestApiClient]::unable to access resource');
      return null;
    } else throw new Error();
  }

  async createUser(user) {
    const response = await this.makeApiCall('/users', 'POST', user);
    if (response.status === SUCCESS || response.status === SUCCESS_CREATE) {
      return {};
    // eslint-disable-next-line no-else-return
    } else if (response.status === BADREQUEST) {
      console.warn('[RestApiClient]::request was malformed');
      return response.json().then((data) => data);
    } else throw new Error();
  }

  async getAllCourses() {
    const response = await this.makeApiCall('/courses');
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    // eslint-disable-next-line no-else-return
    } else if (response.status === BADREQUEST) {
      console.warn('[RestApiClient]::request was malformed');
      return response.json().then((data) => data.errors);
    } else throw new Error();
  }
}

export default RestApiClient;
