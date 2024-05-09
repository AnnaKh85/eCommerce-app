import './FormInput.css';

import React from 'react';

interface InputProps {
  placeholder: string;
  className: string;
  type: 'text';
}

const FormInput: React.FC<InputProps> = ({ placeholder, className, type }) => {
  return <input className={className} type={type} placeholder={placeholder} />;
};

export default FormInput;
