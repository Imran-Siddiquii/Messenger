const access_token = 'access_token';
const user_info = 'user_info';
export const saveToken = (token: string) => {
  localStorage.setItem(access_token, token);
};

export const getToken = (): string => {
  const token = localStorage.getItem(access_token);
  if (token) return token;
  return '';
};

export const saveUser = (user: any) => {
  localStorage.setItem(user_info, JSON.stringify(user));
};

export const getUser = (): any => {
  const user = JSON.parse(localStorage.getItem(user_info) || '');
  if (user) return user;
  return '';
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
