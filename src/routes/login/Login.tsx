import React, { useState } from 'react';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../../api/firebase/firebase';
import { startSession } from '../../storages';

export const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validate the inputs
    if (email === '' || password === '') {
      setError('Please enter your username and password.');
      return;
    }

    // clear the errors
    setError('');

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      navigate('/user');
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Login
      </Typography>
      {error !== '' && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      <Box
        autoComplete="off"
        component="form"
        onSubmit={
        onSubmit as (event: React.FormEvent<HTMLFormElement>) => void
        }>
        <TextField
          label="Email"
          variant="outlined"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
          sx={{ mt: 1 }}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          sx={{ mt: 3 }}
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 3 }} fullWidth>
          Login
        </Button>
        <Box sx={{ mt: 2 }}>
          Don&apos;t have an account yet? <Link to="/register">Register</Link>
        </Box>
      </Box>
    </Container>
  );
};
