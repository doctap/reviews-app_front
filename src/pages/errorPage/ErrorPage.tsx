import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

interface ErrorResponse {
  data: any
  status: number
  statusText: string
  message?: string
}

const errorCheck = (error: any): error is ErrorResponse => {
  return 'data' in error && 'status' in error && 'statusText' in error;
};

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  if (errorCheck(error)) {
    return (
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <i>{error.statusText ?? error?.message}</i>
        </Typography>
      </Container>
    );
  } else {
    return <></>;
  }
};
