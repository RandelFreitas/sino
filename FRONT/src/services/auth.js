export const TOKEN_KEY = "@token";
//export const isAuthenticated = () => true;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
  console.log(token);
  console.log(getToken());
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};