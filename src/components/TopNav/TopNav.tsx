import { Link } from 'react-router-dom';

import Button from '../button/Button.tsx';
import styles from './TopNav.module.css';

function TopNav() {
  return (
    <div className={styles.topnav}>
      <div>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div>
        <img className={styles.mainLogo} src="../icons/Main-logo.png" alt="main logo" />
      </div>
      <div className={styles.icons}>
        <Link to="/login">
          <Button
            label="Log in"
            classname="button-light"
            type="button"
            disable={false}
            onClick={() => console.log('Login')}
          />
        </Link>
        <Link to="/registration">
          <Button
            label="Sign up"
            classname="button-dark"
            type="button"
            disable={false}
            onClick={() => console.log('registration')}
          />
        </Link>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping fa-xl"></i>
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
