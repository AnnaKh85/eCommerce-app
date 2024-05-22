import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import React from 'react';
import { Link } from 'react-router-dom';

import { ABOUT_US, CATALOG_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../services/constants.ts';

const Footer: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const pages: string[] = ['Home', 'Catalog', 'About us', 'Login', 'Registration'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsBikeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            Mammagamma
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={
                    page === 'Home'
                      ? HOME_ROUTE
                      : page === 'Catalog'
                        ? CATALOG_ROUTE
                        : page === 'About us'
                          ? ABOUT_US
                          : page === 'Login'
                            ? LOGIN_ROUTE
                            : REGISTRATION_ROUTE
                  }
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DirectionsBikeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={HOME_ROUTE}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Mammagamma
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center', justifyContent: 'center' } }}
          >
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={CATALOG_ROUTE}>
              Catalog
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={LOGIN_ROUTE}>
              Login
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={REGISTRATION_ROUTE}>
              Signup
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={ABOUT_US}>
              About us
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
