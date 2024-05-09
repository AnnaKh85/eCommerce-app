import './cards.css';

import type { Customer } from '../../services/interfaces.ts';

interface CardItemProps {
  item: Customer;
}

function CardItem({ item }: CardItemProps) {
  const { lastName, firstName, email } = item;

  return (
    <li className="card-item">
      <h3>{`${firstName} ${lastName}`}</h3>
      <p>{email}</p>
    </li>
  );
}

export default CardItem;
