import React from 'react';
import { Button } from 'react-bootstrap';

interface ILoginButton {
  onLogin: () => void
}

export const LoginButton = (props: ILoginButton) => {
  return (
    <Button
      size='sm'
      variant="outline-success"
      onClick={props.onLogin}
    >
      Log In
    </Button>
  );
};
