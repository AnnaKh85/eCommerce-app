import type { Customer } from '../../services/interfaces';

interface CustomerProps {
  customer: Customer;
}

const GeneralInfo: React.FC<CustomerProps> = ({ customer }) => {
  return (
    <div className="general-info-block">
      <p>Name: {customer.firstName}</p>
      <p>Last name: {customer.lastName}</p>
      <p>Date of birth: {customer.dateOfBirth}</p>
      <button>Change</button>
    </div>
  );
};

export default GeneralInfo;
