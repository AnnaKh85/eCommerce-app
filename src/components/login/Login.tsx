import './login.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { REGISTRATION_ROUTE } from '../../services/constants';
import Button from '../button/Button';
import FormInput from '../input/FormInput';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const inputEmail = e.target as HTMLInputElement;
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputEmail.value.length > 0) {
      if (!checkEmail.test(inputEmail.value)) {
        setEmailError('Email address must be properly formatted (e.g., user@example.com)');
      } else {
        setEmailError('');
      }
    }
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const inputPassword = e.target as HTMLInputElement;

    const checkLength = inputPassword.value.length >= 8;
    const checkUpperCase = /[A-Z]/.test(inputPassword.value);
    const checkLowerCase = /[a-z]/.test(inputPassword.value);
    const checkDigit = /\d/.test(inputPassword.value);
    const checkWhiteSpace = inputPassword.value.trim() === inputPassword.value;
    if (inputPassword.value.length > 0) {
      if (!checkLength || !checkUpperCase || !checkLowerCase || !checkDigit || !checkWhiteSpace) {
        setPasswordError(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and must not contain leading or trailing whitespace.',
        );
      } else {
        setPasswordError('');
      }
    }
  };

  return (
    <div className="form-container">
      <form className="login-form">
        <FormInput placeholder="Email" className="form-input" type="text" value={email} onChange={handleInputEmail} />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

        <FormInput
          placeholder="Password"
          className="form-input"
          type="text"
          value={password}
          onChange={handleInputPassword}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <Button
          label="Log in"
          className="button-dark"
          type="button"
          disable={false}
          onClick={() => console.log('Form Log in')}
        />
        <Link to={`/${REGISTRATION_ROUTE}`}>
          <Button
            label="Sign up"
            className="button-dark LoginPageSignUpButton"
            type="button"
            disable={false}
            onClick={() => console.log('registration')}
          />
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
