import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { ABOUT_US, CATALOG_ROUTE, HOME_ROUTE } from '../../services/constants.ts';

function PageNav() {
  return (
    <Box sx={{ minWidth: '270px' }}>
      <BottomNavigation
        showLabels
        sx={{
          '.MuiBottomNavigationAction-label': {
            display: { xs: 'none', sm: 'inline' },
          },
        }}
      >
        <BottomNavigationAction
          label="HOME"
          icon={<HomeIcon sx={{ color: '#2A254B' }} />}
          component={Link}
          to={HOME_ROUTE}
        />
        <BottomNavigationAction
          label="CATALOG"
          icon={<DirectionsBikeIcon sx={{ color: '#2A254B' }} />}
          component={Link}
          to={CATALOG_ROUTE}
        />
        <BottomNavigationAction
          label="ABOUT US"
          icon={<Diversity3Icon sx={{ color: '#2A254B' }} />}
          component={Link}
          to={ABOUT_US}
        />
      </BottomNavigation>
    </Box>
  );
}

export default PageNav;
