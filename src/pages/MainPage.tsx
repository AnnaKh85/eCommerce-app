import { useEffect } from 'react';

import Card from '../components/card/Card.tsx';
import getAllCustomers from '../services/api/getAllCustomers.ts';
import { getAdminBearerToken } from '../utils/getAdminToken.ts';

export async function customerLoader() {
  const allCustomers = await getAllCustomers();
  console.log(allCustomers.results);
  return allCustomers.results;
}

function MainPage() {
  // before rendering page call function getAdminToken and save it into LocalStorage
  useEffect(() => {
    const fetchAndStoreToken = async () => {
      const token = await getAdminBearerToken();
      if (!localStorage.getItem('adminToken')) {
        localStorage.setItem('adminToken', token);
      }
    };

    fetchAndStoreToken();
  }, []);

  return (
    <>
      <h2 className="test">MainPage</h2>
      <Card />
    </>
  );
}

export default MainPage;
