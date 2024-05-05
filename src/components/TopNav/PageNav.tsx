import { Link } from 'react-router-dom';

import styles from './TopNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.mainMenuLink}>
        <li>
          <Link to="/">Home page</Link>
        </li>
        <li>
          <Link to="/registration">Registration page</Link>
        </li>
        <li>
          <Link to="/login">Login page</Link>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
