export const BASE_URL =
  process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:3001/api/v1/'
    : '/api/v1/';
