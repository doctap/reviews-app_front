import React, { useState } from 'react';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../../api';
import { startSession } from '../../storages';

export const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validate the inputs
    if (email === '' || password === '' || repeatPassword === '') {
      setError('Please fill out all the fields.');
      return;
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    // clear the errors
    setError('');

    try {
      let registerResponse = await createUser(email, password);
      startSession(registerResponse.user);
      navigate('/user');
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Register
      </Typography>
      {error !== '' && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={
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
        <TextField
          label="Repeat password"
          variant="outlined"
          type="password"
          autoComplete="repeat-new-password"
          value={repeatPassword}
          onChange={(e) => { setRepeatPassword(e.target.value); }}
          sx={{ mt: 3 }}
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 3 }} fullWidth>
          Register
        </Button>
        <Box sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Container>
  );
};
