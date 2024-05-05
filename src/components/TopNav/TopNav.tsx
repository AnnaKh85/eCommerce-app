import { Link } from 'react-router-dom';

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
        <Link to="/registration">
          <i className="fa-regular fa-user"></i>
        </Link>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  );
}

export default TopNav;
