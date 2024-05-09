import mainLogo from '@assets/Main-logo.png';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';
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
        <img className={styles.mainLogo} src={mainLogo} alt="main logo" />
      </div>
      <div className={styles.icons}>
        <Link to={LOGIN_ROUTE}>
          <Button
            label="Log in"
            className="button-light"
            type="button"
            disable={false}
            onClick={() => console.log('Login')}
          />
        </Link>
        <Link to={REGISTRATION_ROUTE}>
          <Button
            label="Sign up"
            className="button-dark"
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
