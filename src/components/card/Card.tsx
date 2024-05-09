import './cards.css';

import { useEffect, useState } from 'react';

import getAllCustomers from '../../services/api/getAllCustomers.ts';
import type { Customer } from '../../services/interfaces.ts';
import CardItem from './CardItem.tsx';

function Card() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const getCustomers = async () => {
      const allCustomers = await getAllCustomers();
      setCustomers(allCustomers.results);
      return allCustomers.results;
    };

    getCustomers();
  }, []);

  return (
    <ul className="card">
      {customers.map((customer: Customer) => (
        <CardItem item={customer} key={customer.id} />
      ))}
    </ul>
  );
}

export default Card;
