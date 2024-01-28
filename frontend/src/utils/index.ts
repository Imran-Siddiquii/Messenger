const access_token = 'access_token';
export const saveToken = (token: string) => {
  localStorage.setItem(access_token, token);
};

export const getToken = (): boolean => {
  const token = localStorage.getItem(access_token);
  return Boolean(token);
};
