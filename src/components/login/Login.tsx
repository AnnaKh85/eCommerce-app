import './login.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { REGISTRATION_ROUTE } from '../../utils/constants.ts';
import Button from '../button/Button';
import FormInput from '../input/FormInput';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const input = e.target as HTMLInputElement;

    const checkLength = input.value.length >= 8;
    const checkUpperCase = /[A-Z]/.test(input.value);
    const checkLowerCase = /[a-z]/.test(input.value);
    const checkDigit = /\d/.test(input.value);
    const checkWhiteSpace = input.value.trim() === input.value;
    if (input.value.length > 0) {
      if (!checkLength || !checkUpperCase || !checkLowerCase || !checkDigit || !checkWhiteSpace) {
        setPasswordError('enter correct password data');
        console.log('enter correct password data');
      } else {
        setPasswordError('correct password data');
        console.log('correct password data');
      }
    }
  };

  return (
    <div className="form-container">
      <form className="login-form">
        <FormInput placeholder="Password" className="form-input" type="text" value={password} onChange={handleChange} />
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
