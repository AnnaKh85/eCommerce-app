import './button.css';

import React from 'react';

interface ButtonProps {
  label: string;
  classname: string;
  type: 'button' | 'submit' | 'reset';
  disable: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, classname, type, disable, onClick }) => {
  return (
    <button className={classname} type={type} disabled={disable} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
