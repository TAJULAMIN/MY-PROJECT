import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

import { Link } from 'react-router-dom';

// Slide-in animation
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Background styling
const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${require('../assets/book1.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '93.8vh',
  width: '100vw',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

// Form container styling
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  maxWidth: '400px',
  width: '100%',
  margin: theme.spacing(4),
  animation: `${slideIn} 0.6s ease-out`,
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: Call API for authentication
  };



  return (
    <BackgroundBox>
      <FormContainer component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FF5722', mb: 3 }}>
          Sign In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#FF5722',
            color: 'white',
            mt: 2,
            '&:hover': { backgroundColor: '#E64A19' },
          }}
          fullWidth
        >
          Login
        </Button>
       
          <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            mt: 2,
            color: '#FF5722',
            borderColor: '#FF5722',
            '&:hover': { borderColor: '#E64A19', color: '#E64A19' },
          }}
          fullWidth
        >
          Back to Home
        </Button>
      </FormContainer>
    </BackgroundBox>
  );
}
