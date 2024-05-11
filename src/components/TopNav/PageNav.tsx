import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import { ABOUT_US, CATALOG_ROUTE, HOME_ROUTE } from '../../services/constants.ts';

function PageNav() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <ListItem disablePadding>
          <ListItemButton component={Link} to={HOME_ROUTE}>
            <ListItemText primary="Home page" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={CATALOG_ROUTE}>
            <ListItemText primary="Catalog page" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={ABOUT_US}>
            <ListItemText primary="About us" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default PageNav;
