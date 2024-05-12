import mainLogo from '@assets/Screenshot_1019.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, InputBase, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';
import styles from './TopNav.module.css';

function TopNav() {
  return (
    <div className={styles.topnav}>
      <div>
        <Paper component="form" sx={{ p: '1px 2px', display: 'flex', alignItems: 'center', width: 300 }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'Search...' }} />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div>
        <img className={styles.mainLogo} src={mainLogo} alt="main logo" />
      </div>
      <div className={styles.icons}>
        <Link to={LOGIN_ROUTE}>
          <Button variant="outlined"> Log in </Button>
        </Link>
        <Link to={REGISTRATION_ROUTE}>
          <Button variant="contained"> Sign up </Button>
        </Link>
        <Link to="/cart">
          <ShoppingCartIcon fontSize="large" sx={{ color: '#2A254B' }} />
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
