import { Credentials } from './interfaces/api.interface';

export const login = async (credentials: Credentials) => {
  return fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export const getAllUsers = async () => {
  return fetch('/users', {
    method: 'GET',
    credentials: 'include',
  });
};
