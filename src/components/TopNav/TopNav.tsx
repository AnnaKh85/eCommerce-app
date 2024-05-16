import mainLogo from '@assets/Screenshot_1019.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';
import { useAuth } from '../login/AuthContext.tsx';
import PageNav from './PageNav.tsx';
import styles from './TopNav.module.css';

function TopNav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className={styles.topnav}>
      <div>
        <Link to={HOME_ROUTE}>
          <img className={styles.mainLogo} src={mainLogo} alt="main logo" />
        </Link>
      </div>
      <PageNav />
      <div className={styles.icons}>
        {isAuthenticated ? (
          <Button
            variant="outlined"
            component={Link}
            to={HOME_ROUTE}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button variant="outlined" component={Link} to={LOGIN_ROUTE}>
            Log in
          </Button>
        )}

        {isAuthenticated ? (
          <Button variant="contained" component={Link} to={PROFILE_ROUTE}>
            Profile
          </Button>
        ) : (
          <Button variant="contained" component={Link} to={REGISTRATION_ROUTE}>
            Sign up
          </Button>
        )}

        <Link to={CART_ROUTE}>
          <ShoppingCartIcon fontSize="large" sx={{ color: '#2A254B' }} />
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
