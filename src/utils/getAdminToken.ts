import { PRODUCT_KEY } from '../services/constants.ts';

export async function getAdminBearerToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${
        import.meta.env.VITE_CTP_SCOPES
      }`,
      {
        headers: {
          Authorization: 'Basic Rk4yS1ozenN4OVFDclR0enRvRmZLSDliOkYtbTBxRW9lYmNLZEo5WTFJN3kxMlM5Q0ZQZHNGNmZ4',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      },
    );
    const responseData = await response.json();
    return responseData.access_token;
  } catch (e: unknown) {
    console.error('An unknown error occurred with getAdminBearerToken: ', e);
  }
}

export async function generateAnonymousToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${PRODUCT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        headers: {
          Authorization: 'Basic Rk4yS1ozenN4OVFDclR0enRvRmZLSDliOkYtbTBxRW9lYmNLZEo5WTFJN3kxMlM5Q0ZQZHNGNmZ4',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      },
    );

    const token = await response.json();
    return token.access_token;
  } catch (err) {
    console.error(err);
  }
}
