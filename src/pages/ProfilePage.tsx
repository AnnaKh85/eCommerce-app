import { useEffect, useState } from 'react';

import Addresses from '../components/addresses/Addresses';
import GeneralInfo from '../components/generalInfo/GeneralInfo';
import Loader from '../components/loader/Loader';
import { ApiError } from '../services/api/apiError';
import getCustomerInfo from '../services/api/getCustomerInfo';
import type { Customer } from '../services/interfaces';

function ProfilePage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    if (customerId !== null) {
      getCustomerInfo(customerId)
        .then((data) => {
          setCustomer(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof ApiError) {
            if (error.responseError.statusCode === 401) {
              setServerError('Something went wrong. Try to reload page!');
            } else {
              setServerError(error.message);
            }
          } else {
            setServerError('Something went wrong');
          }
          setLoading(false);
        });
    }
  }, []);

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Profile page</h2>
      {serverError && <div>{serverError}</div>}
      {customer && (
        <>
          <GeneralInfo customer={customer} onCustomerUpdate={handleCustomerUpdate} />
          <Addresses customer={customer} />
        </>
      )}
    </>
  );
}

export default ProfilePage;
