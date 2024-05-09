import './cards.css';

import { useLoaderData } from 'react-router-dom';

import type { Customer } from '../../services/interfaces.ts';
import CardItem from './CardItem.tsx';

function Card() {
  const customers = useLoaderData() as Customer[];
  console.log(customers);

  return (
    <ul className="card">
      {customers.map((customer: Customer) => (
        <CardItem item={customer} key={customer.id} />
      ))}
    </ul>
  );
}

export default Card;
