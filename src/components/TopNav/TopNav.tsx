// import mainLogo from '@assets/Screenshot_1019.png';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';
import { useAuth } from '../login/AuthContext.tsx';
import PageNav from './PageNav.tsx';
import styles from './TopNav.module.css';

// import React from "react";

function TopNav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className={styles.topnav}>
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to={HOME_ROUTE}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <DirectionsBikeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        Mammagamma
      </Typography>
      {/*<div>*/}
      {/*    <Link to={HOME_ROUTE}>*/}
      {/*        <img className={styles.mainLogo} src={mainLogo} alt="main logo"/>*/}
      {/*    </Link>*/}
      {/*</div>*/}
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
            {/*Logout*/}
            {/*<LogoutIcon/>*/}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { sx: '0.6rem', sm: '0.8rem' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Logout
            </Typography>
            <LogoutIcon
              sx={{
                display: { xs: 'flex', sm: 'none' },
                fontSize: { sx: '1rem', md: '2rem' },
                mr: 1,
              }}
            />
          </Button>
        ) : (
          <Button variant="outlined" component={Link} to={LOGIN_ROUTE}>
            {/*Log in*/}
            {/*<LoginIcon/>*/}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { sx: '0.6rem', sm: '0.8rem' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Login
            </Typography>
            <LoginIcon
              sx={{
                display: { xs: 'flex', sm: 'none' },
                fontSize: { sx: '1rem', md: '2rem' },
                mr: 1,
              }}
            />
          </Button>
        )}

        {isAuthenticated ? (
          <Button variant="contained" component={Link} to={PROFILE_ROUTE}>
            {/*Profile*/}
            {/*<ManageAccountsIcon />*/}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { sx: '0.6rem', sm: '0.8rem' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Profile
            </Typography>
            <ManageAccountsIcon
              sx={{
                display: { xs: 'flex', sm: 'none' },
                fontSize: { sx: '1rem', md: '2rem' },
                mr: 1,
              }}
            />
          </Button>
        ) : (
          <Button variant="contained" component={Link} to={REGISTRATION_ROUTE}>
            {/*Sign up*/}
            {/*<PersonAddIcon />*/}
            <Typography
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { sx: '0.6rem', sm: '0.8rem' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Signup
            </Typography>
            <PersonAddIcon
              sx={{
                display: { xs: 'flex', sm: 'none' },
                fontSize: { sx: '1rem', md: '2rem' },
                mr: 1,
              }}
            />
          </Button>
        )}

        <Link to={CART_ROUTE}>
          <ShoppingCartIcon
            sx={{
              color: '#2A254B',
              fontSize: { sx: '1.8rem', sm: '2rem' },
            }}
          />
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
