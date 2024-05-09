export async function getAdminBearerToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${
        import.meta.env.VITE_CTP_SCOPES
      }`,
      {
        headers: {
          Authorization:
            'Basic ' + btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      },
    );
    const responseData = await response.json();
    console.log(`responseData.access_token: ${responseData.access_token}`);
    return responseData.access_token;
  } catch (e: unknown) {
    console.error('An unknown error occurred with getAdminBearerToken: ', e);
  }
}
