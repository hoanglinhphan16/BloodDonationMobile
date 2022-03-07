import {createAction} from 'redux-api-middleware';
const API = 'https://52.55.36.104:8000/api/v1/';

export const apiToken = formData =>
  createAction({
    endpoint: 'https://blooddonation.xyz/api/v1/login',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: 'Basic RXJwX0FwcDoxcTJ3M0Uq',
    },
    body: formData,
    types: ['token ', 'token1', 'token2'],
  });
