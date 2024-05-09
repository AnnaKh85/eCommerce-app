import './login.css';

import { Link } from 'react-router-dom';

import { REGISTRATION_ROUTE } from '../../utils/constants.ts';
import Button from '../button/Button';
import FormInput from '../input/FormInput';

function LoginForm() {
  return (
    <div className="form-container">
      <form className="login-form">
        <FormInput placeholder="Email" className="form-input" type="text" />
        <FormInput placeholder="Password" className="form-input" type="text" />
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
