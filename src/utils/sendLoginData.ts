import type { LoginFormValues } from '../components/login/LoginForm';
import { BASE_URL, PRODUCT_KEY } from '../services/constants';

export default async function setAuth(values: LoginFormValues) {
  try {
    const requestBody = {
      email: values.email,
      password: values.password,
    };

    const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/login`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.debug('Auth error: ', error);
    throw error;
  }
}
