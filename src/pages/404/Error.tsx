import Button from '@mui/material/Button';
import { Link, useRouteError } from 'react-router-dom';

import { HOME_ROUTE } from '../../services/constants.ts';
import type { RouteError } from '../../services/interfaces.ts';

function Error() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h2>Something went wrong 😢</h2>
      <p>{error.data || error.message}</p>
      <Button variant="contained" fullWidth component={Link} to={HOME_ROUTE}>
        GO TO HOME PAGE
      </Button>
    </div>
  );
}
export default Error;
