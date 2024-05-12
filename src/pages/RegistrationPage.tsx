import React, { useState } from 'react';

import RegistrationForm from '../components/registration-form/RegistrationForm';
import RegistrationResponse from '../components/registration-response/RegistrationResponse';

function RegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <>
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess}></RegistrationForm>
      <RegistrationResponse onClose={() => setIsSuccess(false)} isOpen={isSuccess} />
    </>
  );
}

export default RegistrationPage;
