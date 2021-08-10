const SUCCESS = 200;
const UNAUTHORIZED = 401;
// TODO: convert class to singleton because it might be a better practise.
class RestApiClient {
  // eslint-disable-next-line class-methods-use-this
  makeApiCall(endpoint, _method = 'GET') {
    const requestBuilder = {
      _method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    return fetch(endpoint, requestBuilder);
  }

  async get(path) {
    const response = await this.makeApiCall(path);
    if (response.status === SUCCESS) {
      return response.json()
        .then((data) => data);
    // eslint-disable-next-line no-else-return
    } else if (response.status === UNAUTHORIZED) {
      console.warn(`unable to access ${path}`);
      return null;
    } else {
      throw new Error();
    }
  }
}

export default RestApiClient;
