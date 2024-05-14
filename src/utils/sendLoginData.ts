import { BASE_URL, PRODUCT_KEY } from '../services/constants';

export default async function setAuth() {
  try {
    const requestBody = {
      email: 'johndoe@example.com',
      password: 'secret123',
    };

    const response = await fetch(`${BASE_URL}/${PRODUCT_KEY}/login`, {
      headers: {
        Authorization: `Bearer RUUDsx3DeoeDNqCN-6XpMsOKh51r2dDC`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();
    console.log(`LOG IN responseData: ${responseData.customer.firstName}`);
  } catch (e: unknown) {
    console.error('An unknown error occurred with getAdminBearerToken: ', e);
  }
}
