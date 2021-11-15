import handleResponse from './handleResponse';

const API_URL = process.env.WORDPRESS_API_URL;

async function handleRequest(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  return fetch(API_URL, requestOptions).then(handleResponse);
}
export default handleRequest;
