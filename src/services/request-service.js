const AUTH_URL = `https://gitlab.com/oauth/`;
const API_URL = `https://gitlab.com/api/v4/`;

const request = (url, options) => {
  return fetch(url, options)
    .then(response => {
      if (!response.ok || response.status < 200 || response.status >= 300) {
        throw Error(`${response.status}${response.statusText ? ' - ' + response.statusText : ''}`);
      }
      // console.log(`${API_URL}${url}`, response);
      return response.json();
    })
    .catch(error => console.log(error));
};

const getHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }
}

/**
 * Get data from server
 * @param url
 * @returns {Promise<() => Promise<any>>}
 */
const get = (url) => {
  return request(`${API_URL}${url}`, {
    headers: getHeaders()
  });
};

const post = (url, data) => {
  return request(`${API_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

const patch = (url, data) => {
  return request(`${API_URL}${url}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

const remove = (url) => request(`${API_URL}${url}`, {
  method: 'DELETE',
  headers: getHeaders(),
});

export {AUTH_URL, API_URL, request, get, post, patch, remove};
