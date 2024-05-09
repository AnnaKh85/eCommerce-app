import { Link, useRouteError } from 'react-router-dom';

import Button from '../../components/button/Button.tsx';
import { HOME_ROUTE } from '../../services/constants.ts';
import type { RouteError } from '../../services/interfaces.ts';

function Error() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h2>Something went wrong 😢</h2>
      <p>{error.data || error.message}</p>
      <Link to={HOME_ROUTE}>
        <Button
          label="GO TO HOME PAGE"
          className="button-dark"
          type="button"
          disable={false}
          onClick={() => console.log('home page')}
        />
      </Link>
    </div>
  );
}
export default Error;
