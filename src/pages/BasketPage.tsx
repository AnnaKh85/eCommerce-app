import { Link } from 'react-router-dom';

import TopNav from '../components/TopNav/TopNav.tsx';
import TopNavLinks from '../components/TopNav/TopNavLinks.tsx';
import { CATALOG_ROUTE } from '../utils/constants.ts';

function BasketPage() {
  return (
    <>
      <TopNav />
      <TopNavLinks />
      <h2>Your shopping cart is empty</h2>
      <Link to={`/${CATALOG_ROUTE}`}>Start to shopping</Link>
    </>
  );
}

export default BasketPage;
