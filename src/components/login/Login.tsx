// import './login.css';

// import { Box, TextField } from '@mui/material';
// import Button from '@mui/material/Button';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import { REGISTRATION_ROUTE } from '../../services/constants';

// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//     const inputEmail = e.target as HTMLInputElement;
//     const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (inputEmail.value.length > 0) {
//       if (!checkEmail.test(inputEmail.value)) {
//         setEmailError('Wrong email format');
//       } else {
//         setEmailError('');
//       }
//     }
//   };

//   const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//     const inputPassword = e.target as HTMLInputElement;

//     const checkLength = inputPassword.value.length >= 8;
//     const checkUpperCase = /[A-Z]/.test(inputPassword.value);
//     const checkLowerCase = /[a-z]/.test(inputPassword.value);
//     const checkDigit = /\d/.test(inputPassword.value);
//     const checkWhiteSpace = inputPassword.value.trim() === inputPassword.value;
//     if (inputPassword.value.length > 0) {
//       if (!checkLength || !checkUpperCase || !checkLowerCase || !checkDigit || !checkWhiteSpace) {
//         setPasswordError('Wrong password format');
//       } else {
//         setPasswordError('');
//       }
//     }
//   };

//   return (
//     <Box width={400} my={4} display="flex" flexDirection="column" margin="0 auto" alignItems="center" gap={4} p={2}>
//       <TextField
//         required
//         fullWidth
//         id="standard-required"
//         label="Email"
//         variant="standard"
//         helperText={emailError ? <span style={{ color: 'red' }}>{emailError}</span> : 'e.g., user@example.com'}
//         value={email}
//         onChange={handleInputEmail}
//       />

//       <TextField
//         id="standard-password-input"
//         required
//         fullWidth
//         label="Password"
//         type="password"
//         autoComplete="current-password"
//         variant="standard"
//         value={password}
//         helperText={
//           passwordError ? (
//             <span style={{ color: 'red' }}>{passwordError}</span>
//           ) : (
//             '8 symbols min, 1 uppercase, 1 lowercase, 1 digit'
//           )
//         }
//         onChange={handleInputPassword}
//       />

//       <Button variant="contained" fullWidth>
//         Log in
//       </Button>

//       <Box width={400} my={4} display="flex" flexDirection="row" margin="0 auto" alignItems="center" gap={4} p={2}>
//         <p>Do not have an account ? </p>
//         <Link to={REGISTRATION_ROUTE}>Register now</Link>
//       </Box>
//     </Box>
//   );
// }

// export default LoginForm;
