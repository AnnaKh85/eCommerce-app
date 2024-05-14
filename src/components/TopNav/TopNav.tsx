import mainLogo from '@assets/Screenshot_1019.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';
import PageNav from './PageNav.tsx';
import styles from './TopNav.module.css';

function TopNav() {
  return (
    <div className={styles.topnav}>
      {/*<div>*/}
      {/*  <Paper component="form" sx={{ p: '1px 2px', display: 'flex', alignItems: 'center', width: 300 }}>*/}
      {/*    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'Search...' }} />*/}
      {/*    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">*/}
      {/*      <SearchIcon />*/}
      {/*    </IconButton>*/}
      {/*  </Paper>*/}
      {/*</div>*/}
      <div>
        <img className={styles.mainLogo} src={mainLogo} alt="main logo" />
      </div>
      <PageNav />
      <div className={styles.icons}>
        <Button variant="outlined" component={Link} to={LOGIN_ROUTE}>
          {' '}
          Log in{' '}
        </Button>
        <Button variant="contained" component={Link} to={REGISTRATION_ROUTE}>
          {' '}
          Sign up{' '}
        </Button>
        <Link to={CART_ROUTE}>
          <ShoppingCartIcon fontSize="large" sx={{ color: '#2A254B' }} />
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
