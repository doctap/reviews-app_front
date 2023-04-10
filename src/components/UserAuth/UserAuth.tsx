import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { type IUser, registerUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { userSlice } from '../../redux/reducers/UserSlice';
import { AuthButton } from '../index';

export const UserAuth = () => {
  const { token, dataUser } = useAppSelector((state) => state.userSlice);
  const { userRecognize } = userSlice.actions;
  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

  const logIn = () => {
    loginWithRedirect();
  };

  const logOut = () => {
    logout({ returnTo: window.location.origin });
  };

  if (isAuthenticated) {
    getAccessTokenSilently().then((t) => {
      dispatch(
        userRecognize({
          token: t,
          dataUser: user as IUser,
          admin: false,
          isAuthenticated
        })
      );
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      registerUser(
        {
          sub: dataUser.sub,
          given_name: dataUser.given_name,
          family_name: dataUser.family_name
        },
        token
      );
    }
  }, [dataUser]);

  return (
    <>
      {isAuthenticated
        ? <div>
          {dataUser.given_name} {dataUser.family_name}
        </div>
        : null}
      <AuthButton isAuth={isAuthenticated} onLogin={logIn} onLogout={logOut} />
    </>
  );
};
