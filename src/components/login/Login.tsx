import './login.css';

import Button from '../button/Button';

function LoginForm() {
  return (
    <div className="form-container">
      <form className="login-form">
        <input type="text" placeholder="LOGIN" />
        <input type="text" placeholder="PASSWORD" />
        <Button
          label="Log in"
          className="button-dark"
          type="button"
          disable={false}
          onClick={() => console.log('Form Log in')}
        />
      </form>
    </div>
  );
}

export default LoginForm;
