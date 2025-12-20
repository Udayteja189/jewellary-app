import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/AuthActions';

type AuthMode = 'login' | 'signup';

interface Props {
  mode?: AuthMode;
}

const AuthForm: React.FC<Props> = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const dispatch = useDispatch();

  const validate = () => {
    const e: Record<string, string> = {};

    if (mode === 'signup' && !name.trim()) e.name = 'Name is required';

    if (!email.trim()) e.email = 'Email is required';

    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) e.email = 'Invalid email';

    if (!password) e.password = 'Password is required';
    if (password && password.length < 6) e.password = 'Password must be at least 6 characters';

    if (mode === 'signup') {
      if (!confirmPassword) e.confirmPassword = 'Confirm your password';
      if (password && confirmPassword && password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;

    console.log("Calling Login API with", { email, password });
    try{
      const res = await fetch(`http://localhost:8080/users/login?email=${email}&password=${password}`,{
        method: 'GET'
      });

      if(!res.ok){
        throw new Error('Failed to authenticate');
      }
      console.log("Response received from server" , res);
      const data = await res.json();
      dispatch(setUser({ user: data.username, email: email, token: data.jwtToken }));
    }catch(err){
      console.log("Error during authentication:", err);
      throw new Error('Authentication error');
    }

    console.log("User signed in");
    navigate('/home');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 360,
        maxWidth: '90%',
        mx: 'auto',
        mt: 6,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        {mode === 'signup' ? 'Create an account' : 'Welcome back'}
      </Typography>

      {mode === 'signup' && (
        <TextField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
      )}

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        type="email"
      />

      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        type="password"
      />

      {mode === 'signup' && (
        <TextField
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          type="password"
        />
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
        {mode === 'signup' ? 'Sign up' : 'Log in'}
      </Button>

      <Typography variant="body2" textAlign="center">
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Link component={RouterLink} to="/">
              Log in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default AuthForm;
