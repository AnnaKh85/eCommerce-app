import { Link } from 'react-router-dom';

import { ABOUT_US, CATALOG_ROUTE, HOME_ROUTE } from '../../utils/constants.ts';
import styles from './TopNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.mainMenuLink}>
        <li>
          <Link to={`/${HOME_ROUTE}`}>Home page</Link>
        </li>
        <li>
          <Link to={`/${CATALOG_ROUTE}`}>Catalog page</Link>
        </li>
        <li>
          <Link to={`/${ABOUT_US}`}>About us</Link>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
