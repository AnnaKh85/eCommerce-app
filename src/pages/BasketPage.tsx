import { Link } from 'react-router-dom';

import { CATALOG_ROUTE } from '../services/constants.ts';

function BasketPage() {
  return (
    <>
      <h2>Your shopping cart is empty</h2>
      <Link to={CATALOG_ROUTE}>Start to shopping</Link>
    </>
  );
}

export default BasketPage;
