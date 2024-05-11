import img404 from '@assets/404.png';
import Button from '@mui/material/Button';
import { Link, useRouteError } from 'react-router-dom';

import { HOME_ROUTE } from '../../services/constants.ts';
import type { RouteError } from '../../services/interfaces.ts';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className={styles.layout404}>
      <img className={styles.pic404} src={img404} alt="not found" />
      <h2>404 - PAGE NOT FOUND</h2>
      <p>{error.data || error.message}</p>
      <p>
        The page you are looking for might have been removed, <br /> had its name changed, or is temporarily
        unavailable.
      </p>
      <Button variant="contained" component={Link} to={HOME_ROUTE}>
        GO TO HOME PAGE
      </Button>
    </div>
  );
}

export default NotFoundPage;
