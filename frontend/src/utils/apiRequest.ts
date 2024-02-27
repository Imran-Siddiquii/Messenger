import { getToken } from './index';

export const apiRequest = async (
  method: string,
  url: string,
  body?: any,
  action?: any,
) => {
  let apiUrl = `${import.meta.env.VITE_API_URL}${url}`;

  if (action) {
    apiUrl += `${action.payload.value}`;
  } else {
    apiUrl += '';
  }

  // Perform your login API call here and return the result
  const response = await fetch(apiUrl, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response;
};
