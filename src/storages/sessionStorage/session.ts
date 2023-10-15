import type { User } from 'firebase/auth';

export const startSession = async (user: User) => {
  const email = user.email as string;
  const IdTokenResult = await user.getIdTokenResult();
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('accessToken', IdTokenResult.token);
};

// сделай кастомный хук useSessionStorage()

export const getSession = () => {
  return {
    email: sessionStorage.getItem('email'),
    accessToken: sessionStorage.getItem('accessToken')
  };
};

export const endSession = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => {
  return getSession().accessToken;
};
