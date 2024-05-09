import './FormInput.css';

import React from 'react';

interface InputProps {
  placeholder: string;
  className: string;
  type: 'text';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<InputProps> = ({ placeholder, className, type, onChange }) => {
  return <input className={className} type={type} placeholder={placeholder} onChange={onChange} />;
};

export default FormInput;
