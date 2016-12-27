import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export const getUsers = () => get('users');

let get = (url) => fetch(baseUrl + url)
  .then(onSuccess, onError);

export const deleteUser = (id) => del(`users/${id}`);

let del = (url) => {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request)
    .then(onSuccess, onError);
};

let onSuccess = (response) => response.json();

let onError = (error) => console.log(error); // eslint-disable-line no-console

