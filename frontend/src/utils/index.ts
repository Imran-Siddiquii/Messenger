const access_token = 'access_token';
export const saveToken = (token: string) => {
  localStorage.setItem(access_token, token);
};

export const getToken = (): string => {
  const token = localStorage.getItem(access_token);
  if (token) return token;
  return '';
};
